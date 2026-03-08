import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { authClient } from "@/lib/auth/client";

export default function UsersPage() {
  const { data: session } = authClient.useSession();
  const [users, setUsers] = useState<any[]>([]);
  const userRole = (session?.user as any)?.role;

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const json = await res.json();
    setUsers(json.data || []);
  };

  useEffect(() => { fetchUsers(); }, []);

  const updateRole = async (id: string, newRole: string) => {
    await fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role: newRole }),
    });
    fetchUsers();
  };

  return (
    <DashboardLayout role={userRole}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black mb-8 text-gray-900">Gestión de Usuarios 👥</h1>
        
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nombre</th>
                <th className="p-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Correo</th>
                <th className="p-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Rol</th>
                <th className="p-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="p-6 font-bold text-gray-800">{user.name}</td>
                  <td className="p-6 text-gray-500 text-sm">{user.email}</td>
                  <td className="p-6 text-center">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black ${
                      user.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <select 
                      onChange={(e) => updateRole(user.id, e.target.value)}
                      value={user.role}
                      className="text-xs font-bold border-gray-100 rounded-xl bg-gray-50 p-2"
                    >
                      <option value="USER">Hacer Usuario</option>
                      <option value="ADMIN">Hacer Admin</option>
                    </select>
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