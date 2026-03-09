import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardHome() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  // Protección de ruta: Si no hay sesión, vuelve al login
  useEffect(() => {
    if (!isPending && !session) {
      router.push('/');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Simple */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-black text-indigo-600">Mestizo</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Panel de Control</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard/movements" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors font-medium">
            <span>📊</span> Movimientos
          </Link>
          
          {/* Solo visible para ADMIN */}
          {session.user.role === 'ADMIN' && (
            <>
              <Link href="/dashboard/users" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors font-medium">
                <span>👥</span> Usuarios
              </Link>
              <Link href="/dashboard/reports" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors font-medium">
                <span>📈</span> Reportes
              </Link>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => router.push('/') } })}
            className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold"
          >
            <span>🚪</span> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-gray-900">¡Hola, {session.user.name}! 👋</h1>
          <p className="text-gray-500">Bienvenido a tu gestión financiera artesanal.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-400 uppercase">Rol Actual</p>
            <p className="text-2xl font-black text-indigo-600">{session.user.role}</p>
          </div>
          
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-400 uppercase">Email</p>
            <p className="text-lg font-bold text-gray-800 truncate">{session.user.email}</p>
          </div>

          <div className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
            <p className="text-sm font-bold opacity-80 uppercase text-white">Estado del Sistema</p>
            <p className="text-2xl font-black">Operativo</p>
          </div>
        </div>
      </main>
    </div>
  );
}