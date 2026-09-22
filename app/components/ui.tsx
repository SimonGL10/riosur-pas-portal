export function BrandMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const box = size === "lg" ? "h-12 w-12 text-base" : size === "sm" ? "h-8 w-8 text-[11px]" : "h-10 w-10 text-sm";
  return (
    <div
      className={`grid place-items-center rounded-[12px] bg-teal font-bold tracking-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] ${box}`}
    >
      RS
    </div>
  );
}

export function Badge({ children, status }: { children: React.ReactNode; status?: string }) {
  const tone =
    status === "bad"
      ? "bg-red-50 text-red-700"
      : status === "warn"
        ? "bg-amber-50 text-amber-800"
        : "bg-emerald-50 text-emerald-800";
  return <span className={`badge ${tone}`}>{children}</span>;
}
