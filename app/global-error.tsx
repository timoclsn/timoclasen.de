"use client";

import { Button } from "../components/Button";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalErrorPage = ({ error, reset }: Props) => {
  console.error(error);
  return (
    <html className="min-h-screen">
      <body className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col gap-10">
          <h2>Irgemdwas ist schief gelaufen…</h2>
          <Button onClick={() => reset()}>Probier es nochmal</Button>
        </div>
      </body>
    </html>
  );
};

export default GlobalErrorPage;
