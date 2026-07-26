const moduleAccents = [
  { code: "STA2005S", token: "sta", className: "border-sta text-sta" },
  { code: "CSC1016S", token: "csc", className: "border-csc text-csc" },
  { code: "MAM2013S", token: "mam", className: "border-mam text-mam" },
] as const;

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Semester</p>
        <h1 className="font-display text-3xl leading-none tracking-tight text-text">
          Good to see you.
        </h1>
        <p className="max-w-md text-base text-muted">
          Scaffold complete — tokens, fonts and nav shell are wired. The real
          dashboard tiles land in build-order step 4.
        </p>
      </header>

      <section className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-6">
        <h2 className="text-sm font-medium text-muted">Module accents</h2>
        <div className="flex flex-wrap gap-3">
          {moduleAccents.map((m) => (
            <span
              key={m.code}
              className={`rounded-full border bg-surface-2 px-4 py-1.5 text-sm font-medium ${m.className}`}
            >
              {m.code}
            </span>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-6">
        <button
          type="button"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-base transition-transform duration-200 ease-out hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Generate study plan
        </button>
        <span className="rounded-full border border-danger/40 bg-danger/10 px-3 py-1 text-xs font-medium text-danger">
          Clash detected · verify on Amathuba
        </span>
      </section>

      <section className="flex flex-col gap-1 rounded-2xl border border-line bg-surface p-6">
        <h2 className="font-display text-2xl text-text">64</h2>
        <p className="text-sm text-muted">
          Countdown numerals use the display type scale up to 64.
        </p>
      </section>
    </div>
  );
}
