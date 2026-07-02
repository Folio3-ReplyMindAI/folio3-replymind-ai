import type { InputHTMLAttributes } from "react";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function AuthField({ label, id, ...inputProps }: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-text-secondary">
        {label}
      </label>
      <input
        id={id}
        {...inputProps}
        className="rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}
