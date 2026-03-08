import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/DashboardLayout";

export default function MovementsPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [movements, setMovements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ concept: "", amount: "", type: "INCOME" as "INCOME" | "EXPENSE" });

  useEffect(() => {
    fetch("/api/auth/get-session").then(res => res.json()).then(data => {
      if (!data.session) return router.push("/");
      setSession(data.session);
      setLoading(false);
    });
  }, [router]);

  const fetchMovements = async () => {
    const res = await fetch("/api/movements");
    const data = await res.json();
    setMovements(data.data || []);
  };

  useEffect(() => { if (session) fetchMovements(); }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/movements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
    });
    if (res.ok) {
      setForm({ concept: "", amount: "", type: "INCOME" });
      fetchMovements();
    }
  };

  if (loading) return null;

  return (
    <DashboardLayout role={session?.user?.role}>
      <div className="max-w-6xl mx-auto pb-20">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Gestión de Finanzas 🍫</h1>

        {/* Formulario Estilizado */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-10">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-6">Registrar Transacción</h2>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              placeholder="Concepto (ej: Compra de Cacao)"
              value={form.concept}
              onChange={(e) => setForm({ ...form, concept: e.target.value })}
              className="flex-grow p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
            <input
              type="number"
              placeholder="Monto $"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="md:w-48 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as any })}
              className="md:w-40 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold"
            >
              <option value="INCOME">Ingreso</option>
              <option value="EXPENSE">Egreso</option>
            </select>
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
              Agregar
            </button>
          </form>
        </div>

        {/* Tabla Minimalista */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Detalle</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Tipo</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Fecha</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {movements.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6 font-bold text-gray-800">{m.concept}</td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-tight ${
                      m.type === 'INCOME' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {m.type === 'INCOME' ? 'INGRESO' : 'EGRESO'}
                    </span>
                  </td>
                  <td className="p-6 text-gray-500 text-sm">{new Date(m.date).toLocaleDateString('es-CO')}</td>
                  <td className={`p-6 text-right font-black text-lg ${
                    m.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {m.type === 'INCOME' ? '+' : '-'} ${m.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}