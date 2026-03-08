import { authClient } from '@/lib/auth/client';
import DashboardLayout from '../../components/DashboardLayout';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 });

  useEffect(() => {
    fetch(`/api/movements?t=${Date.now()}`)
      .then((res) => res.json())
      .then((json) => {
        const movements = json.data || [];
        const income = movements.filter((m: any) => m.type === 'INCOME').reduce((acc: number, m: any) => acc + m.amount, 0);
        const expense = movements.filter((m: any) => m.type === 'EXPENSE').reduce((acc: number, m: any) => acc + m.amount, 0);
        setStats({ income, expense, balance: income - expense });
      });
  }, []);

  return (
    <DashboardLayout role={(session?.user as any)?.role}>
      <div className='max-w-6xl mx-auto p-4'>
        <h1 className='text-3xl font-black text-gray-900 mb-6'>¡Hola, {session?.user?.name}! 👋</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-emerald-500 p-8 rounded-[2rem] text-white'>
            <p className='text-xs font-bold uppercase opacity-80'>Ingresos</p>
            <h3 className='text-3xl font-black'>${stats.income.toLocaleString()}</h3>
          </div>
          <div className='bg-rose-500 p-8 rounded-[2rem] text-white'>
            <p className='text-xs font-bold uppercase opacity-80'>Egresos</p>
            <h3 className='text-3xl font-black'>${stats.expense.toLocaleString()}</h3>
          </div>
          <div className='bg-indigo-600 p-8 rounded-[2rem] text-white'>
            <p className='text-xs font-bold uppercase opacity-80'>Balance</p>
            <h3 className='text-3xl font-black'>${stats.balance.toLocaleString()}</h3>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}