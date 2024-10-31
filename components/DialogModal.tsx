import { ReactNode } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { DialogHeader } from './ui/dialog';

interface DialogModalProps {
    isOpen: boolean;
    title: string;
    description?: string;
    children: ReactNode;
    onClose: () => void;
}

const DialogModal: React.FC<DialogModalProps> = ({ isOpen, title, description, children, onClose }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                    <div className="mt-4">
                        {children}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogModal;
