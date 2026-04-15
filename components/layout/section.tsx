type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  centered?: boolean;
  stagger?: boolean;
};

export function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
  centered = false,
  stagger = true,
}: SectionProps) {
  return (
    <section
      className={`section ${className}`}
      data-animate="reveal"
      data-stagger={stagger ? "true" : undefined}
    >
      <div className="container">
        {eyebrow ? (
          <p className={`eyebrow ${centered ? "mx-auto" : ""}`}>{eyebrow}</p>
        ) : null}
        <h2
          className={`text-balance text-3xl font-bold md:text-4xl ${centered ? "text-center" : ""}`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-3 max-w-2xl text-[var(--color-muted)] ${centered ? "mx-auto text-center" : ""}`}
          >
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
