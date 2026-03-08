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
    try {
      await authClient.signIn.social({
        provider: 'github',
        // Usamos la URL completa para evitar errores de redirección
        callbackURL: `${window.location.origin}/dashboard`,
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  if (isPending) return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <div className='animate-pulse text-indigo-600 font-bold text-xl'>Cargando Mestizo...</div>
    </div>
  );

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6'>
      <div className='bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-gray-100 text-center max-w-sm w-full'>
        <div className='text-5xl mb-4'>🍫</div>
        <h1 className='text-4xl font-black text-gray-900 mb-2'>Mestizo</h1>
        <p className='text-gray-500 mb-8 font-medium'>Gestión Financiera Artesanal</p>
        <button
          onClick={handleLogin}
          className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3'
        >
          <span>Entrar con GitHub</span>
        </button>
      </div>
    </div>
  );
}