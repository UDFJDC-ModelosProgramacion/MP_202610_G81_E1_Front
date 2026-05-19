import { CheckCircle, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface StatusDialogsProps {
  showSuccess: boolean;
  onSuccessClose: () => void;
  successTitle: string;
  successDescription: string;
  showError: boolean;
  onErrorClose: () => void;
  errorTitle?: string;
  errorMessage?: string | null;
}

export function StatusDialogs({
  showSuccess,
  onSuccessClose,
  successTitle,
  successDescription,
  showError,
  onErrorClose,
  errorTitle = 'Registration Error',
  errorMessage,
}: Readonly<StatusDialogsProps>) {
  return (
    <>
      {/* Dialog de Éxito */}
      <Dialog open={showSuccess} onOpenChange={onSuccessClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <span>{successTitle}</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              {successDescription}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm"
              onClick={onSuccessClose}
            >
              Accept
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Error */}
      <Dialog open={showError} onOpenChange={onErrorClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2 text-red-600">
              <AlertCircle className="h-12 w-12" />
              <span>{errorTitle}</span>
            </DialogTitle>
            <DialogDescription className="text-center text-red-500">
              {errorMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
              onClick={onErrorClose}
            >
              Accept
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
