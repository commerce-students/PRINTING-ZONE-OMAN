"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this is where a monitoring service would receive the error.
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <section className="section">
      <div className="container-page max-w-2xl">
        <span className="badge badge-neutral">Something went wrong</span>
        <h1 className="display-lg mt-4">The page could not be prepared</h1>
        <p className="lede mt-4">
          An unexpected error stopped this page from loading. Nothing you submitted was lost — try
          again, or contact the team if it keeps happening.
        </p>
        {error.digest ? (
          <p className="hint mt-3">
            Error reference: <span className="mono">{error.digest}</span>
          </p>
        ) : null}
        <div className="mt-7 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-primary btn-lg">
            Try again
          </button>
          <Link href="/" className="btn btn-secondary btn-lg">
            Back to home
          </Link>
          <Link href="/contact" className="btn btn-ghost btn-lg">
            Contact the team
          </Link>
        </div>
      </div>
    </section>
  );
}
