export function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-paper-200 ${className ?? ""}`} aria-hidden="true" />;
}
