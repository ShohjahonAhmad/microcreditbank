import { Card } from "./card";

type StatCardProps = {
  value: string;
  label: string;
  hint?: string;
};

export function StatCard({ value, label, hint }: StatCardProps) {
  return (
    <Card className="p-6">
      <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-accent">{label}</p>
      {hint ? <p className="mt-3 text-sm leading-6 text-muted-strong">{hint}</p> : null}
    </Card>
  );
}
