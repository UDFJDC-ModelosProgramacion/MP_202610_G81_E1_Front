import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message: string;
}

export function FormError({ message }: Readonly<FormErrorProps>) {
  return (
    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
      <AlertCircle className="w-3 h-3" />
      {message}
    </p>
  );
}
