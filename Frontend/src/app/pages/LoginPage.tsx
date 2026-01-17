import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, hasRole, loginWithKeycloak } = useAuth();

  
  useEffect(() => {
    if (!isAuthenticated) return;

    if (hasRole('manager')) {
      navigate('/manager', { replace: true });
    } else if (hasRole('employee')) {
      navigate('/employee', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, hasRole, navigate]);

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-4">
    <div className="max-w-md w-full bg-gray-900 rounded-xl shadow-2xl p-8 text-center border border-gray-800 hover:shadow-3xl hover:border-orange-500 transition-all duration-300">
      <h1 className="text-3xl mb-2 text-white">
        Welcome
      </h1>

      <p className="text-gray-300 mb-8">
        Sign in using your company account
      </p>

      <button
        type="button"
        onClick={loginWithKeycloak}
        className="w-full bg-orange-600 text-white py-3 rounded-lg
                   hover:bg-orange-500 transition-colors
                   shadow-lg hover:shadow-xl"
      >
        Login with Keycloak
      </button>

      <p className="mt-6 text-sm text-gray-400">
        You will be redirected to the secure login page
      </p>

      <div className="mt-6">
        <a
          href="/"
          className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  </div>
);
}