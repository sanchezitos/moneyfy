// pages/movements.tsx
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useQuery, gql } from '@apollo/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Plus, UserPen } from 'lucide-react';
import { User } from './users';
import Loading from '@/components/Loading';
import { useState } from 'react';
import { DataTable } from '@/components/DataTable';
import AddMovementForm from '@/components/AddMovementForm';
import { useSession } from 'next-auth/react';
import { GET_USERS } from '@/graphql/queries/getUsers';

const GET_MOVEMENTS = gql`
  query GetMovements {
    movements {
      id
      type
      amount
      date
      user {
        id
        name
      }
    }
  }
`;
interface Movement {
  id: string;
  type: string;
  amount: string;
  date: string;
  user: User;
}

const Movements = () => {
  const { data: session } = useSession();
  const { data, loading, error } = useQuery(GET_MOVEMENTS);
  console.log(" on movements....",data)

  const { data: users, loading: loading_users, error: error_users } = useQuery(GET_USERS);
  console.log("Users on movements....", users)

  const [openDialog, setOpenDialog] = useState<'edit' | 'add' | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState<{ id: string; type: string; amount: string; date: string } | null>(null);

  const columns: ColumnDef<Movement>[] = [
    {
      accessorKey: "type",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Concepto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Monto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "date",
      header: "Fecha",
    },
    {
      accessorKey: "user.name",
      header: "Usuario",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const movement = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => {
                  setOpenDialog('edit')
                  setOpenEditDialog(movement)
                }

                }>
                  <UserPen />
                  <span>Editar usuario</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                {/*  <DropdownMenuItem>
                                <UserPen />
                                <span>Eliminar usuario</span>
                            </DropdownMenuItem> */}
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setOpenDialog('add')}>
                  <Plus />
                  <span>Agregar movimiento</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];


  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (

    <div className="p-4">
      <h1 className="text-xl font-bold">Gestión de Movimientos</h1>
      <Button className='bg-purple-700 hover:bg-purple-300' onClick={() => setOpenDialog("add")}>
        <Plus /> Agregar
      </Button>
     
      <DataTable columns={columns} data={data.movements} />
      {openDialog === 'add' && (
        <AddMovementForm
        dataUsers={users}
          onClose={() => {

            setOpenAddDialog(null)
            setOpenDialog(null)
          }}
        />

      )}
    </div>
  );
};

export default Movements;
