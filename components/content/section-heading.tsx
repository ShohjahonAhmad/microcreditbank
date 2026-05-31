type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-slate-600">{subtitle}</p>
    </div>
  );
}
