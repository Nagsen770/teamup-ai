export default function Loading() {
  return (
    <main className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-16 animate-pulse rounded-3xl bg-muted" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-80 animate-pulse rounded-3xl bg-muted md:col-span-2" />
        <div className="h-80 animate-pulse rounded-3xl bg-muted" />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-3xl bg-muted" />
        ))}
      </div>
    </main>
  );
}
