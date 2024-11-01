import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@/components/ui/button';
import DialogModal from '@/components/DialogModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select';

import { toast } from "sonner"
import { EDIT_USER } from '@/graphql/mutations/editUser';



interface EditUserFormProps {
    initialId?: string
    initialName?: string;
    initialRole?: string;
    onClose: () => void;
    onUserUpdated: () => void; // Callback para recargar la lista de usuarios después de actualizar
}

const EditUserForm: React.FC<EditUserFormProps> = ({ initialId, initialName, initialRole, onClose, onUserUpdated }) => {
    const [id] = useState(initialId);
    const [name, setName] = useState(initialName);
    const [role, setRole] = useState(initialRole);
    const [editUser, { loading, error }] = useMutation(EDIT_USER);

    const handleSave = async () => {
        try {
            await editUser({
                variables: { id, name, role },
            });
            
            onUserUpdated();
            onClose();
            toast.success("Usuario actualizado exitosamente"); // Cierra el diálogo después de la actualización
        } catch (e) {
            console.error("Error updating user:", e);
        }
    };

    return (
        <DialogModal
            isOpen={true}
            title="Editar usuario"
            description="Modifique el nombre y el rol del usuario."
            onClose={onClose}
        >
            <form className="space-y-4">
                <div>
                    <Label htmlFor="name" className="text-sm font-medium">Nombre</Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="role" className="text-sm font-medium">Rol</Label>
                    <Select
                        value={role}
                        onValueChange={(value) => setRole(value)}
                    >
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Seleccione un rol" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {error && <p className="text-red-500 text-sm">Error al actualizar el usuario.</p>}

                <div className="flex justify-end space-x-2">
                    <Button variant="ghost" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button className='bg-purple-700 hover:bg-purple-300' onClick={handleSave} disabled={loading}>
                        {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                </div>
            </form>
        </DialogModal>
    );
};

export default EditUserForm;
