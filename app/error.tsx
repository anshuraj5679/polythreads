'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Something went wrong!</h2>
        <p className="text-foreground/60">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
