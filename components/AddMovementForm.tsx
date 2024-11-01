import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button } from '@/components/ui/button';
import DialogModal from '@/components/DialogModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar'


import { toast } from "sonner"
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { ADD_MOVEMENT } from '@/graphql/mutations/addMovement';

interface AddMovementFormProps {
    dataUsers: { users: [] },
    onClose: () => void;
}

const AddMovementForm: React.FC<AddMovementFormProps> = ({ dataUsers, onClose }) => {
    const [addMovement, { loading, error }] = useMutation(ADD_MOVEMENT);
    const { users } = dataUsers;
    console.log("Data users on form add movement.....", users)
    const [user, setUser] = useState<number>();
    const [type, setType] = useState<string>("");
    const [amount, setAmount] = useState<number>();
    const [date, setDate] = useState<Date>()
console.log("userID....", user)
    const handleSave = async () => {
        try {
            await addMovement({
                variables: { type, amount, date, userId:user },
            });
            onClose();
            toast.success("Movimiento registrado exitosamente"); // Cierra el diálogo después de la creación
        } catch (e) {
            console.error("Error adding movement:", e);
        }
    };

    return (
        <DialogModal
            isOpen={true}
            title="Agregar movimiento"
            description="Agrega un movimiento "
            onClose={onClose}
        >
            <form className="space-y-4">
                <div>
                    <Label htmlFor="type" className="text-sm font-medium">Usuario</Label>
                    <Select
                        onValueChange={(value) => setUser(parseFloat(value))}
                    >
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecciona un usuario" />
                        </SelectTrigger>
                        <SelectContent>
                            {users.map(user => {
                                return (
                                    <SelectItem key={user?.id} value={user.id}>{user.email}</SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="type" className="text-sm font-medium">Concepto</Label>
                    <Select
                        onValueChange={(value) => setType(value)}
                    >
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecciona un concepto" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="credit">Ingreso</SelectItem>
                            <SelectItem value="debit">Gasto</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="amount" className="text-sm font-medium">Monto</Label>
                    <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        className="mt-1"
                        placeholder='100000'
                    />
                </div>

                <div>

                    <Label htmlFor="date" className="text-sm font-medium">Fecha</Label>
                    <br></br>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={"mt-1"}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Elige una fecha</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white border border-gray-300 shadow-lg rounded-md">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {error && <p className="text-red-500 text-sm">Error al crear movimiento.</p>}

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

export default AddMovementForm;
