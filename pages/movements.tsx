// pages/movements.tsx
import { useQuery, gql } from '@apollo/client';
import { useSession } from 'next-auth/react';

const GET_MOVEMENTS = gql`
  query GetMovements {
    movimientos {
      id
      concepto
      monto
      fecha
      usuario {
        nombre
      }
    }
  }
`;

const Movements = () => {
  const { data, loading, error } = useQuery(GET_MOVEMENTS);
  const { data: session } = useSession();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Gestión de Movimientos</h1>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 px-4 py-2">Concepto</th>
            <th className="w-1/4 px-4 py-2">Monto</th>
            <th className="w-1/4 px-4 py-2">Fecha</th>
            <th className="w-1/4 px-4 py-2">Usuario</th>
          </tr>
        </thead>
        <tbody>
          {data.movimientos.map((movimiento: any) => (
            <tr key={movimiento.id}>
              <td className="border px-4 py-2">{movimiento.concepto}</td>
              <td className="border px-4 py-2">${movimiento.monto}</td>
              <td className="border px-4 py-2">{new Date(movimiento.fecha).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{movimiento.usuario.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Movements;
