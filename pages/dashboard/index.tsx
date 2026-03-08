import { authClient } from '@/lib/auth/client';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 });

  useEffect(() => {
    // Añadimos un timestamp para evitar que Vercel cachee los datos viejos
    fetch(`/api/movements?t=${Date.now()}`)
      .then((res) => res.json())
      .then((json) => {
        const movements = json.data || [];
        const income = movements
          .filter((m: any) => m.type === 'INCOME')
          .reduce((acc: number, m: any) => acc + m.amount, 0);
        const expense = movements
          .filter((m: any) => m.type === 'EXPENSE')
          .reduce((acc: number, m: any) => acc + m.amount, 0);
        setStats({ income, expense, balance: income - expense });
      });
  }, []);

  const userRole = (session?.user as any)?.role;

  return (
    <DashboardLayout role={userRole}>
      <div className='max-w-6xl mx-auto'>
        <header className='mb-10'>
          <h1 className='text-4xl font-black text-gray-900'>
            ¡Hola, {session?.user?.name || 'Chef'}! 👋
          </h1>
          <p className='text-gray-500 mt-2'>Resumen financiero de Mestizo Cacao.</p>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          <div className='bg-emerald-500 p-8 rounded-[2rem] text-white shadow-lg'>
            <p className='text-emerald-100 text-xs font-bold uppercase'>Ingresos</p>
            <h3 className='text-3xl font-black'>${stats.income.toLocaleString()}</h3>
          </div>
          <div className='bg-rose-500 p-8 rounded-[2rem] text-white shadow-lg'>
            <p className='text-rose-100 text-xs font-bold uppercase'>Egresos</p>
            <h3 className='text-3xl font-black'>${stats.expense.toLocaleString()}</h3>
          </div>
          <div className='bg-indigo-600 p-8 rounded-[2rem] text-white shadow-lg'>
            <p className='text-indigo-100 text-xs font-bold uppercase'>Balance</p>
            <h3 className='text-3xl font-black'>${stats.balance.toLocaleString()}</h3>
          </div>
        </div>

        <div className='bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm'>
          <h3 className='text-2xl font-bold mb-4'>Acceso rápido</h3>
          <Link href='/dashboard/movements' className='inline-block bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform'>
            Registrar Movimiento
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}