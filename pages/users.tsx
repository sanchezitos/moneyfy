// pages/users.tsx
import { useQuery, gql } from '@apollo/client';
import WithAuth from '@/libs/WithAuth';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
    }
  }
`;

const Users = () => {
  const { data, loading, error } = useQuery(GET_USERS);
console.log("data.....", data)


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
          {data.users.map((user: any) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithAuth(Users, 'admin');
