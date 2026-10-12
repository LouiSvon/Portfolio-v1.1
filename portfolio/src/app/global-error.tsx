"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Une erreur est survenue</h2>
          <button onClick={reset}>Réessayer</button>
        </div>
      </body>
    </html>
  );
}
