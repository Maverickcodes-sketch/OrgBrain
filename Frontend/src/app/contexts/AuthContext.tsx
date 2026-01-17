import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { jwtDecode } from 'jwt-decode';

export const KEYCLOAK_URL =import.meta.env.VITE_KEYCLOAK_URL;

export const KEYCLOAK_REALM =import.meta.env.VITE_KEYCLOAK_REALM;

export const KEYCLOAK_CLIENT_ID =import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

export const REDIRECT_URI =`${window.location.origin}/login/callback`;




interface DecodedToken {
  sub: string;
  email?: string;
  preferred_username?: string;

  resource_access?: {
    projecterp1?: {
      roles: string[];
    };
  };

  exp: number;
}

interface AuthContextType {
  token: string | null;
  user: DecodedToken | null;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
  loginWithKeycloak: () => Promise<void>;
  handleCallback: () => Promise<void>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}


export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem('access_token')
  );
  const [user, setUser] = useState<DecodedToken | null>(null);


  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUser(decoded);

      const expiresInMs = decoded.exp * 1000 - Date.now();


      if (expiresInMs < 60_000) {
        refreshAccessToken();
      }
    } catch {
      logout();
    }
  }, [token]);


  const loginWithKeycloak = async () => {
    const verifier = generateCodeVerifier();
    sessionStorage.setItem('pkce_verifier', verifier);

    const challenge = await generateCodeChallenge(verifier);

    const authUrl =
      `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/auth` +
      `?client_id=${KEYCLOAK_CLIENT_ID}` +
      `&response_type=code` +
      `&scope=openid profile email` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&code_challenge=${challenge}` +
      `&code_challenge_method=S256`;

    window.location.href = authUrl;
  };

  const handleCallback = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const verifier = sessionStorage.getItem('pkce_verifier');

    if (!code || !verifier) {
      throw new Error('Invalid PKCE callback');
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: KEYCLOAK_CLIENT_ID,
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: verifier,
    });

    const response = await fetch(
      `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      }
    );

    if (!response.ok) throw new Error('Token exchange failed');

    const data = await response.json();

    sessionStorage.setItem('access_token', data.access_token);
    sessionStorage.setItem('refresh_token', data.refresh_token);
    sessionStorage.removeItem('pkce_verifier');

    window.history.replaceState({}, document.title, '/');

    setToken(data.access_token);
  };

  const refreshAccessToken = async () => {
    const refreshToken = sessionStorage.getItem('refresh_token');
    if (!refreshToken) {
      logout();
      return;
    }

    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: KEYCLOAK_CLIENT_ID,
      refresh_token: refreshToken,
    });

    const response = await fetch(
      `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      }
    );

    if (!response.ok) {
      logout();
      return;
    }

    const data = await response.json();

    sessionStorage.setItem('access_token', data.access_token);
    sessionStorage.setItem('refresh_token', data.refresh_token);
    setToken(data.access_token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    sessionStorage.clear();

    const logoutUrl =
      `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/logout` +
      `?client_id=${KEYCLOAK_CLIENT_ID}` +
      `&post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}`;

    window.location.href = logoutUrl;
  };

  
  const hasRole = (role: string): boolean => {
    return (
      user?.resource_access?.projecterp1?.roles?.includes(role) ?? false
    );
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token && !!user,
        hasRole,
        loginWithKeycloak,
        handleCallback,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
