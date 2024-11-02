import { useState } from 'react';
import { useQuery } from '@apollo/client';
import WithAuth from '@/libs/WithAuth';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/DataTable';
import { ArrowUpDown, MoreHorizontal, Plus, UserPen } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loading from '@/components/Loading';
import DialogModal from '@/components/DialogModal';
import EditUserForm from '@/components/EditUserForm';
import { GET_USERS } from '@/graphql/queries/getUsers'


export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

const Users = () => {
    const { data, loading, error, refetch } = useQuery(GET_USERS);
    const [openDialog, setOpenDialog] = useState<'edit' | 'add' | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState<{ id: string; name: string; role: string } | null>(null);

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Correo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: "role",
            header: "Role",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original;

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
                                    setOpenEditDialog(user)
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
            <h1 className="text-xl font-bold">Gestión de Usuarios</h1>
            <DataTable columns={columns} data={data.users} filter='name'/>

            {/* Dialog for editing user */}
            {openDialog === 'edit' && (
                <EditUserForm
                    initialId={openEditDialog?.id}
                    initialName={openEditDialog?.name}
                    initialRole={openEditDialog?.role}
                    onClose={() => {
                        setOpenEditDialog(null)
                        setOpenDialog(null)
                    }}
                    onUserUpdated={refetch} // Recarga los datos de usuario después de actualizar
                />
            )}

            {/* Dialog for adding movement */}
            {openDialog === 'add' && (
                <DialogModal
                    isOpen={openDialog === 'add'}
                    title="Agregar movimiento"
                    description="Ajuste los datos para agregar un movimiento."
                    onClose={() => setOpenDialog(null)}
                >
                    {/* Aquí puedes añadir el contenido específico para agregar el movimiento */}
                    <p>Formulario para agregar movimiento</p>
                </DialogModal>
            )}
        </div>
    );
};

export default WithAuth(Users, 'admin');
