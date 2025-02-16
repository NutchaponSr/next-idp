"use client";

import { InputHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";

import { IconVariant } from "@/types/icon";

import { Input, inputVariants } from "@/components/ui/input";

import { CircleCancelIcon } from "@/components/icons";

interface ClearableInputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  onClear?: () => void;
}

export const ClearableInput = ({
  area,
  type,
  value,
  variant,
  placeholder,
  onChange,
  onClear,
  ...props
}: ClearableInputProps) => {
  return (
    <div className="relative flex items-center w-full">
      <Input 
        area={area}
        type={type}
        value={value}
        variant={variant}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
      {value && (
        <button className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center justify-center shrink-0 grow-0 rounded-full size-5 hover:bg-[#37352f29]" onClick={onClear}>
          <CircleCancelIcon className="fill-[#37352f59] size-4" variant={IconVariant.SOLID} />
        </button>
      )}
    </div>
  );
}