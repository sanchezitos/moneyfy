// pages/reports.tsx
import { useSession } from 'next-auth/react';

const Reports = () => {
  const { data: session } = useSession();

  if (!session || session.user.role !== 'admin') {
    return <p>Acceso denegado. Solo para administradores.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Reportes</h1>
      {/* Aquí se implementaría el gráfico de movimientos y el botón de descarga de CSV */}
      <p>Saldo actual: ...</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Descargar CSV</button>
    </div>
  );
};

export default Reports;
