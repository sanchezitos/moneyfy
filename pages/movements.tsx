// pages/movements.tsx
import { useQuery, gql } from '@apollo/client';
import { useSession } from 'next-auth/react';

const GET_MOVEMENTS = gql`
  query GetMovements {
    movements {
      id
      type
      amount
      date
      user {
        name
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
          {data.movements.map((movement: any) => (
            <tr key={movement.id}>
              <td className="border px-4 py-2">{movement.type}</td>
              <td className="border px-4 py-2">${movement.amount}</td>
              <td className="border px-4 py-2">{new Date(movement.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{movement.user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Movements;
