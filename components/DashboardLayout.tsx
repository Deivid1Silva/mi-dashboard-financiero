import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { authClient } from "@/lib/auth/client";

export default function DashboardLayout({ children, role }: { children: ReactNode; role?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50"> 
      <aside className="w-64 bg-white border-r flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <h1 className="text-2xl font-black text-indigo-600 tracking-tighter">
            MESTIZO <span className="text-gray-400">CACAO</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all font-medium text-gray-600">
            <span>📊</span> Panel Principal
          </Link>
          <Link href="/dashboard/movements" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all font-medium text-gray-600">
            <span>💰</span> Movimientos
          </Link>
          
          {role === "ADMIN" && (
            <div className="pt-4 mt-4 border-t border-gray-100">
              <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Administración</p>
              <Link href="/dashboard/users" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all font-medium text-gray-600">
                <span>👥</span> Usuarios
              </Link>
              <Link href="/dashboard/reports" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all font-medium text-gray-600">
                <span>📄</span> Reportes
              </Link>
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-600 py-3 rounded-xl font-bold hover:bg-rose-100 transition-colors"
          >
            <span>🚪</span> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}