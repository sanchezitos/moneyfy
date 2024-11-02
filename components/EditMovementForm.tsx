import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@/components/ui/button';
import DialogModal from '@/components/DialogModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select';

import { toast } from "sonner"
import { EDIT_MOVEMENT } from '@/graphql/mutations/editMovement';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar'



interface EditMovementFormProps {
    initialId?: string;
    initialConcept?: string;
    initialType?: string;
    initialAmount?: string;
    initialDate?: string;
    onClose: () => void;
    onMovementUpdated: () => void;
}

const EditMovementForm: React.FC<EditMovementFormProps> = ({ initialId, initialConcept, initialType, initialAmount, initialDate, onClose, onMovementUpdated }) => {
    const [id, setId] = useState(initialId)
    const [concept, setConcept] = useState(initialConcept);
    const [type, setType] = useState(initialType);
    const [amount, setAmount] = useState(initialAmount);
    const [date, setDate] = useState(
        initialDate ? new Date(Number(initialDate)) : null);
    const [editMovement, { loading, error }] = useMutation(EDIT_MOVEMENT);

    const handleSave = async () => {
        try {
            await editMovement({
                variables: { id, concept, type, amount, date},
            });
            onMovementUpdated();
            onClose();
            toast.success("Movimiento actualizado exitosamente");
        } catch (e) {
            console.error("Error updating movement:", e);
        }
    };

    return (
        <DialogModal
            isOpen={true}
            title="Editar movimiento"
            description="Puedes modificar los campos que necesites"
            onClose={onClose}
        >
            <form className="space-y-4">
                <div>
                    <Label htmlFor="type" className="text-sm font-medium">Tipo de movimiento</Label>
                    <Select
                        value={type}
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
                    <Label htmlFor="concept" className="text-sm font-medium">Concepto</Label>
                    <Input
                        id="concept"
                        type="text"
                        value={concept}
                        onChange={(e) => setConcept(e.target.value)}
                        className="mt-1"
                        placeholder='Compras supermercado'
                    />
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
                                {date ? format(new Date(Number(date)), "PPP") : <span>Elige una fecha</span>}
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
                {error && <p className="text-red-500 text-sm">Error al actualizar el movimiento.</p>}

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

export default EditMovementForm;
