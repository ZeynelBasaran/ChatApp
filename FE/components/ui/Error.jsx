"use client"

import { getErrorMessage } from "../../utils/helpers";
import Button from "./Button";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-4">
          {error ? getErrorMessage(error) : "An unknown error occurred"}
        </p>
        {reset && (
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
        )}
      </div>
    </div>
  );
}
