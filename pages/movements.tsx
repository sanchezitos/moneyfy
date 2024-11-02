// pages/movements.tsx
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useQuery, gql } from '@apollo/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal, Plus, UserPen } from 'lucide-react';
import { User } from './users';
import Loading from '@/components/Loading';
import { useState } from 'react';
import { DataTable } from '@/components/DataTable';
import AddMovementForm from '@/components/AddMovementForm';
import { useSession } from 'next-auth/react';
import { GET_USERS } from '@/graphql/queries/getUsers';
import { GET_MOVEMENTS } from '@/graphql/queries/getMovements';

import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el idioma español si deseas formatear en español
import EditMovementForm from '@/components/EditMovementForm';
dayjs.locale('es'); // Configura Day.js para usar el idioma español



interface Movement {
  id: string;
  type: string;
  amount: string;
  date: string;
  user: User;
}

const Movements = () => {
  const { data: session } = useSession();
  const { data, loading, error, refetch } = useQuery(GET_MOVEMENTS);

  const { data: users, loading: loading_users, error: error_users } = useQuery(GET_USERS);
  console.log("Users on movements....", users)

  const [openDialog, setOpenDialog] = useState<'edit' | 'add' | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState<{ id: string, type: string; concept: string; amount: string; date: string } | null>(null);

  const columns: ColumnDef<Movement>[] = [
    {
      accessorKey: "concept",
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
      accessorKey: "type",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const type = row.original.type
        if (type === "credit") {
          return (
            <div className="flex justify-center items-center">
              <ArrowUp width={20} className='text-green-700' />
              <span>Ingreso</span>
            </div>
          );
        } else {
          return (
            <div className="flex justify-center items-center">
              <ArrowDown width={20} className='text-red-700' />
              <span>Gasto</span>
            </div>
          )

        }

      }
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
      cell: ({ row }) => {
        const formattedAmount = new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0, // Opcional: para evitar decimales si no son necesarios
        }).format(row.original.amount);
        return (
          <div>{formattedAmount}</div>
        );
      }
    },
    {
      accessorKey: "user.name",
      header: "Usuario",
    },
    {
      accessorKey: "date",
      header: "Fecha",
      cell: ({ row }) => {
        const formattedDate = dayjs(Number(row.original.date)).format("DD [de] MMMM [de] YYYY");
        return (
          <div>{formattedDate}</div>
        );
      }
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const movement = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
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
                  <span>Editar movimiento</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserPen />
                  <span>Eliminar movimiento</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];


  if (loading || loading_users) return <Loading />;
  if (error || error_users) return <p>Error: {error.message}</p>;

  return (

    <div className="p-4">
      <h1 className="text-xl font-bold">Gestión de Movimientos</h1>
      <Button className='bg-purple-700 hover:bg-purple-300' onClick={() => setOpenDialog("add")}>
        <Plus /> Agregar
      </Button>

      <DataTable columns={columns} data={data.movements}  filter='concept'/>
      {openDialog === 'add' && (
        <AddMovementForm
          dataUsers={users}
          onClose={() => {
            refetch()
            setOpenDialog(null)
          }}
        />

      )}
      {openDialog === "edit" && (
        <EditMovementForm
        initialId={openEditDialog?.id}
        initialConcept={openEditDialog?.concept}
        initialType={openEditDialog?.type}
        initialAmount={openEditDialog?.amount}
        initialDate={openEditDialog?.date}
        onClose={() => {
          setOpenEditDialog(null)
          setOpenDialog(null)
        }}
        onMovementUpdated={refetch}
        />
      )}
    </div>
  );
};

export default Movements;
