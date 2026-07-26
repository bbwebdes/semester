export function PagePlaceholder({
  title,
  step,
}: {
  title: string;
  step: string;
}) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-6">
      <h1 className="font-display text-3xl leading-none tracking-tight text-text">
        {title}
      </h1>
      <p className="text-base text-muted">{step}</p>
    </div>
  );
}
