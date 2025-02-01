import { CircleXIcon } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center justify-between bg-[#ffe2dd] rounded-md p-3">
      <div className="flex items-center space-x-2">
        <CircleXIcon className="size-5 text-[#ffe2dd] fill-[#e16f64]" />
        <span className="text-[#5d1715] text-xs">{message}</span>
      </div>
    </div>
  );
}