import { CircleCheckIcon } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center justify-between bg-[#dbeddb] rounded-md p-3">
      <div className="flex items-center space-x-2">
        <CircleCheckIcon className="size-5 text-[#dbeddb] fill-[#6c9b7d]" />
        <span className="text-[#1c3829] text-xs">{message}</span>
      </div>
    </div>
  );
}