import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { authClient } from '@/lib/auth/client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function ReportsPage() {
  const { data: session } = authClient.useSession();
  const [movements, setMovements] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const userRole = (session?.user as any)?.role;

  useEffect(() => {
    setMounted(true);
    fetch('/api/movements')
      .then((res) => res.json())
      .then((json) => setMovements(json.data || []));
  }, []);

  const incomeTotal = movements
    .filter((m) => m.type === 'INCOME')
    .reduce((acc, m) => acc + m.amount, 0);
  const expenseTotal = movements
    .filter((m) => m.type === 'EXPENSE')
    .reduce((acc, m) => acc + m.amount, 0);
  const totalBalance = incomeTotal - expenseTotal;

  const chartData = [
    { name: 'Ingresos', valor: incomeTotal, color: '#10b981' },
    { name: 'Egresos', valor: expenseTotal, color: '#f43f5e' },
  ];

  const exportCSV = () => {
    const headers = ['Fecha', 'Concepto', 'Tipo', 'Monto'];
    const rows = movements.map((m) => [
      new Date(m.date).toLocaleDateString(),
      m.concept,
      m.type,
      m.amount,
    ]);
    const csvContent = [
      headers.join(','),
      ...rows.map((r) => r.join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Reporte_Mestizo_Cacao.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!mounted) return null;

  return (
    <DashboardLayout role={userRole}>
      <div className='max-w-5xl mx-auto py-6 px-4'>
        <h1 className='text-3xl font-black mb-8 text-gray-900'>
          Análisis Financiero 📊
        </h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10'>
          <div className='lg:col-span-1 bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col justify-center min-h-[200px]'>
            <p className='text-indigo-200 text-xs font-bold uppercase tracking-widest mb-2'>
              Saldo Neto Actual
            </p>
            <h2 className='text-4xl font-black'>
              ${totalBalance.toLocaleString()}
            </h2>
          </div>

          <div className='lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm min-h-[350px]'>
            <p className='text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-6 text-center'>
              Comparativa de Flujo de Caja
            </p>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray='3 3'
                    vertical={false}
                    stroke='#f0f0f0'
                  />
                  <XAxis
                    dataKey='name'
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 'bold' }}
                  />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{
                      borderRadius: '15px',
                      border: 'none',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Bar dataKey='valor' radius={[10, 10, 10, 10]} barSize={60}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className='bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm text-center'>
          <div className='w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl'>
            📈
          </div>
          <h3 className='text-2xl font-bold text-gray-800 mb-2'>
            Exportar Movimientos
          </h3>
          <p className='text-gray-400 mb-8 max-w-sm mx-auto'>
            Genera un archivo CSV con el histórico completo para tu contabilidad
            en Excel.
          </p>
          <button
            onClick={exportCSV}
            className='w-full max-w-xs bg-gray-900 text-white py-4 rounded-2xl font-black hover:bg-black transition-all shadow-lg'
          >
            Descargar Reporte CSV
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
