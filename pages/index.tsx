import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard', // Importante: a dónde va tras el login
    });
  };

  if (isPending)
    return (
      <div className='flex justify-center items-center h-screen'>
        Cargando...
      </div>
    );

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6'>
      <div className='bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center max-w-sm w-full'>
        <h1 className='text-4xl font-extrabold text-gray-900 mb-2'>Mestizo</h1>
        <p className='text-gray-500 mb-8'>Sistema de Gestión Financiera</p>

        <button
          onClick={handleLogin}
          className='w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3'
        >
          <span>Iniciar sesión con GitHub</span>
        </button>
      </div>
    </div>
  );
}
