// pages/users.tsx
import { useQuery, gql } from '@apollo/client';
import { useSession } from 'next-auth/react';
import WithAuth from '@/libs/WithAuth';

const GET_USERS = gql`
  query GetUsers {
    usuarios {
      id
      nombre
      correo
      rol
    }
  }
`;

const Users = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  const { data: session } = useSession();
console.log("session.....", data)
  if (!session || session.user.role !== 'admin') {
    return <p>Acceso denegado. Solo para administradores.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Gestión de Usuarios</h1>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 px-4 py-2">Nombre</th>
            <th className="w-1/3 px-4 py-2">Correo</th>
            <th className="w-1/3 px-4 py-2">Rol</th>
          </tr>
        </thead>
        <tbody>
          {data.usuarios.map((usuario: any) => (
            <tr key={usuario.id}>
              <td className="border px-4 py-2">{usuario.nombre}</td>
              <td className="border px-4 py-2">{usuario.correo}</td>
              <td className="border px-4 py-2">{usuario.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithAuth(Users, 'admin');;
