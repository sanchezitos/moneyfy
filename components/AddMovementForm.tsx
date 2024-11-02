// Librerías de terceros
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { toast } from "sonner";

// Componentes internos de UI y utilidades
import { Button } from '@/components/ui/button';
import DialogModal from '@/components/DialogModal';
import { Input } from '@/components/ui/input';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { FormControl, FormField, FormItem, FormLabel, Form, FormMessage } from './ui/form';

// Archivos específicos del proyecto
import { ADD_MOVEMENT } from '@/graphql/mutations/addMovement';


interface AddMovementFormProps {
    dataUsers: { users: [] },
    onClose: () => void;
}

const addMovementFormSchema = z.object({
    user: z.string().min(1, {
        message: "Usuario debe tener al menos 2 caracteres.",
    }).max(50),
    concept: z.string().min(2, {
        message: "Concepto debe tener al menos 2 caracteres.",
    }).max(50),
    type: z.string().min(2, {
        message: "Tipo debe tener al menos 2 caracteres.",
    }).max(50),
    amount: z.string().min(3, {
        message: "Monto debe ser mayor a 100 COP",
    }),
    date: z.date({
        required_error: "La fecha del movimiento es obligatoria",
    }),

})

const AddMovementForm: React.FC<AddMovementFormProps> = ({ dataUsers, onClose }) => {
    const form = useForm<z.infer<typeof addMovementFormSchema>>({
        resolver: zodResolver(addMovementFormSchema),
        defaultValues: {
            user: "",
            concept: "",
            type: "",
            amount: "",
            date: new Date(),
        }
    })
    const [addMovement, { loading, error }] = useMutation(ADD_MOVEMENT);
    const { users } = dataUsers;
    async function onSubmit(data: z.infer<typeof addMovementFormSchema>) {
        const { type, concept, amount, date, user } = data
        try {
            await addMovement({
                variables: { type, amount: parseFloat(amount), date, userId: parseFloat(user), concept },
            });
            onClose();
            toast.success("Movimiento registrado exitosamente"); // Cierra el diálogo después de la creación
        } catch (e) {
            console.error("Error adding movement:", e);
        }
    }
    return (
        <DialogModal
            isOpen={true}
            title="Agregar movimiento"
            description="Agrega un movimiento "
            onClose={onClose}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="user"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Usuario</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona un usuario" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {users.map((user: { id: string, email: string }) => {
                                            return (
                                                <SelectItem key={user?.id} value={user.id}>{user.email}</SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona un tipo" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="credit">Ingreso</SelectItem>
                                        <SelectItem value="debit">Gasto</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="concept"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Concepto</FormLabel>
                                <FormControl>
                                    <Input onChange={field.onChange} placeholder="Compra supermercado" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Valor</FormLabel>
                                <FormControl>
                                    <Input onChange={field.onChange} type='number' placeholder="100000" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Fecha</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={"mt-1"}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? format(field.value, "PPP") : <span>Elige una fecha</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-white border border-gray-300 shadow-lg rounded-md">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {error && <p className="text-red-500 text-sm">Error al crear movimiento.</p>}

                    <div className="flex justify-end space-x-2">
                        <Button variant="ghost" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" className='bg-purple-700 hover:bg-purple-300' /* onClick={handleSave} */ disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </Form>

        </DialogModal>
    );
};

export default AddMovementForm;
