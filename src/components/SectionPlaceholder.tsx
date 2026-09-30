interface Props {
  id: string;
  title: string;
}

export default function SectionPlaceholder({ id, title }: Props) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="mt-3 text-muted">Coming soon.</p>
      </div>
    </section>
  );
}
