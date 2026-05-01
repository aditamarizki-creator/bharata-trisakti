import { cn } from "@/lib/cn";
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";

const fieldBase =
  "w-full bg-white/70 border border-white/80 backdrop-blur-md rounded-xl px-4 py-3 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)] transition";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  leadingIcon?: ReactNode;
  required?: boolean;
};

export function Input({
  label,
  hint,
  error,
  leadingIcon,
  required,
  className,
  id,
  ...rest
}: InputProps) {
  const inputId = id ?? rest.name;
  return (
    <label className="block" htmlFor={inputId}>
      {label && (
        <span className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
          {label}
          {required && <span className="text-[var(--color-accent)]"> *</span>}
        </span>
      )}
      <span className="relative block">
        {leadingIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]">
            {leadingIcon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            fieldBase,
            leadingIcon && "pl-10",
            error && "border-[#c0463e] focus:ring-[#c0463e]/40 focus:border-[#c0463e]",
            className,
          )}
          {...rest}
        />
      </span>
      {error ? (
        <span className="block text-xs text-[#c0463e] mt-1">{error}</span>
      ) : hint ? (
        <span className="block text-xs text-[var(--color-ink-soft)] mt-1">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
};

export function Textarea({
  label,
  hint,
  error,
  required,
  className,
  id,
  ...rest
}: TextareaProps) {
  const tid = id ?? rest.name;
  return (
    <label className="block" htmlFor={tid}>
      {label && (
        <span className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
          {label}
          {required && <span className="text-[var(--color-accent)]"> *</span>}
        </span>
      )}
      <textarea
        id={tid}
        className={cn(
          fieldBase,
          "min-h-[96px] resize-y",
          error && "border-[#c0463e] focus:ring-[#c0463e]/40",
          className,
        )}
        {...rest}
      />
      {error ? (
        <span className="block text-xs text-[#c0463e] mt-1">{error}</span>
      ) : hint ? (
        <span className="block text-xs text-[var(--color-ink-soft)] mt-1">
          {hint}
        </span>
      ) : null}
    </label>
  );
}
