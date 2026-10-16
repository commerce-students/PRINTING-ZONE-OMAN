"use client";

import { useFormStatus } from "react-dom";

/** Submit button with a real pending state driven by the enclosing form. */
export function SubmitButton({
  children,
  pendingLabel = "Working…",
  className = "btn btn-primary",
  confirm,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
  confirm?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      aria-busy={pending}
      onClick={(event) => {
        if (confirm && !window.confirm(confirm)) event.preventDefault();
      }}
    >
      {pending ? (
        <>
          <span
            aria-hidden="true"
            className="spin inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent"
          />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}
