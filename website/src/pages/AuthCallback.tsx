import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      navigate('/?error=auth_failed');
      return;
    }

    if (!code) {
      navigate('/');
      return;
    }

    exchangeCodeForToken(code);
  }, [searchParams, navigate]);

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const { token } = await response.json();
      localStorage.setItem('packet_token', token);
      
      // Redirect to dashboard
      navigate('/dashboard');
      
      // Reload to trigger auth context to fetch user
      window.location.reload();
    } catch (error) {
      console.error('Auth error:', error);
      navigate('/?error=auth_failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400 mx-auto mb-6"></div>
        <p className="text-white text-xl font-bold">Signing you in...</p>
        <p className="text-white/60 mt-2">Please wait</p>
      </div>
    </div>
  );
}
