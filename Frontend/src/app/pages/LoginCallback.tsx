import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';

export function LoginCallback() {
  const { handleCallback, isAuthenticated, hasRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    handleCallback().catch(() => {
      navigate('/login', { replace: true });
    });
  }, []);

  
  useEffect(() => {
    if (!isAuthenticated) return;

    if (hasRole('manager')) {
      navigate('/manager', { replace: true });
    } else if (hasRole('employee')) {
      navigate('/employee', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated]);

  return <p>Signing you in…</p>;
}

