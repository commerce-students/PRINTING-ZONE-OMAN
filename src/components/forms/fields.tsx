import type { ReactNode } from "react";

/** Shared form primitives so every form on the site behaves identically. */

export function Field({
  id,
  label,
  required,
  hint,
  errors,
  children,
  className = "",
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: ReactNode;
  errors?: string[];
  children: ReactNode;
  className?: string;
}) {
  const hasError = Boolean(errors && errors.length > 0);
  return (
    <div className={`field ${className}`}>
      <label htmlFor={id} className="label">
        {label}
        {required ? (
          <span className="req" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-ink-400">(optional)</span>
        )}
      </label>
      {children}
      {hint && !hasError ? (
        <p className="hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {hasError ? (
        <p className="error-text" id={`${id}-error`} role="alert">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 shrink-0 fill-current">
            <path d="M8 1.5 15 14H1L8 1.5Zm0 4.25a.9.9 0 0 0-.9.94l.15 3.06a.75.75 0 0 0 1.5 0l.15-3.06A.9.9 0 0 0 8 5.75Zm0 6.1a.95.95 0 1 0 0-1.9.95.95 0 0 0 0 1.9Z" />
          </svg>
          <span>{errors![0]}</span>
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({
  id,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
  autoComplete,
  inputMode,
  errors,
  hint,
}: {
  id: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  errors?: string[];
  hint?: string;
}) {
  const invalid = Boolean(errors && errors.length);
  return (
    <input
      id={id}
      name={name}
      type={type}
      required={required}
      defaultValue={defaultValue}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${id}-error` : hint ? `${id}-hint` : undefined}
      className="input"
    />
  );
}

export function TextArea({
  id,
  name,
  rows = 6,
  required,
  defaultValue,
  placeholder,
  errors,
  hint,
}: {
  id: string;
  name: string;
  rows?: number;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  errors?: string[];
  hint?: string;
}) {
  const invalid = Boolean(errors && errors.length);
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      required={required}
      defaultValue={defaultValue}
      placeholder={placeholder}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${id}-error` : hint ? `${id}-hint` : undefined}
      className="textarea"
    />
  );
}

export function SelectInput({
  id,
  name,
  required,
  defaultValue,
  options,
  errors,
}: {
  id: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  options: { value: string; label: string }[];
  errors?: string[];
}) {
  const invalid = Boolean(errors && errors.length);
  return (
    <select
      id={id}
      name={name}
      required={required}
      defaultValue={defaultValue}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${id}-error` : undefined}
      className="select"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function ConsentCheckbox({
  id = "consent",
  name = "consent",
  errors,
  children,
}: {
  id?: string;
  name?: string;
  errors?: string[];
  children: ReactNode;
}) {
  const invalid = Boolean(errors && errors.length);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? `${id}-error` : undefined}
          className="mt-1 h-5 w-5 shrink-0 rounded-xs border border-line-strong accent-ink-950"
        />
        <label htmlFor={id} className="text-sm leading-relaxed text-ink-700">
          {children}
        </label>
      </div>
      {invalid ? (
        <p className="error-text" id={`${id}-error`} role="alert">
          {errors![0]}
        </p>
      ) : null}
    </div>
  );
}

export function FormAlert({
  status,
  message,
  reference,
}: {
  status: "success" | "error";
  message: string;
  reference?: string;
}) {
  if (status === "success") {
    return (
      <div className="notice notice-success" role="status">
        <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 fill-current">
          <path d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm4.1 6.1-5 5a.9.9 0 0 1-1.3 0L5.9 10.7a.9.9 0 1 1 1.3-1.3l1.3 1.3 4.35-4.35a.9.9 0 0 1 1.25 1.25Z" />
        </svg>
        <div>
          <p className="font-semibold">{message}</p>
          {reference ? (
            <p className="mt-1 text-sm">
              Reference: <span className="mono font-semibold">{reference}</span>
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="notice notice-danger" role="alert">
      <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 fill-current">
        <path d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm-.95 4.2h1.9v6.1h-1.9V5.7Zm.95 9.8a1.15 1.15 0 1 1 0-2.3 1.15 1.15 0 0 1 0 2.3Z" />
      </svg>
      <p className="font-semibold">{message}</p>
    </div>
  );
}
