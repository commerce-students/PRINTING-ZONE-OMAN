import type { ReactNode } from "react";

/** Consistent section introduction: plate number, eyebrow, heading, intro copy. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  action,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  action?: ReactNode;
  id?: string;
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={[
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
      ].join(" ")}
    >
      <div className={align === "center" ? "max-w-3xl" : "max-w-2xl"}>
        {eyebrow ? (
          <p className={`eyebrow ${isDark ? "eyebrow--light" : ""} mb-4`}>
            <span>{eyebrow}</span>
          </p>
        ) : null}
        <h2 id={id} className={`display-lg ${isDark ? "text-white" : ""}`}>
          {title}
        </h2>
        {intro ? (
          <div className={`lede mt-5 ${isDark ? "text-white/75" : ""}`}>{intro}</div>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
