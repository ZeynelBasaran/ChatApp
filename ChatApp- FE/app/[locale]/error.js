"use client"

import Error from "../../components/ui/Error";

export default function ErrorPage({ error, reset }) {
  return <Error error={error} reset={reset} />;
}

