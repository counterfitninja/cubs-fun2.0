export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <section className="panel notice" role="status">
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <section className="panel notice" role="alert">
      <h2>Something needs attention</h2>
      <p>{message}</p>
    </section>
  );
}