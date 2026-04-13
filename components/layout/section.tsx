type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section className={`section ${className}`}>
      <div className="container">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="text-balance text-3xl font-bold md:text-4xl">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{description}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
