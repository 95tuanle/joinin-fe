'use client';

import { authenticate } from '@/app/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';

export default function Page() {
  const [state, dispatch] = useFormState(authenticate, undefined);
  return (
    <main className="flex items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <form action={dispatch} className="space-y-3">
          <div className="text-black flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className="mb-3 text-2xl">Please sign in to continue.</h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    aria-describedby="email-error"
                  />
                </div>
              </div>
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {typeof state === 'object' &&
                  state?.errors?.email &&
                  state?.errors.email.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={8}
                    aria-describedby="password-error"
                  />
                </div>
              </div>
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {typeof state === 'object' &&
                  state?.errors?.password &&
                  state?.errors.password.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <SignInButton />
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {typeof state !== 'object' && (
                <p className="text-sm text-red-500">{state}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="mt-4 w-full hover:bg-sky-100 text-gray-600"
      aria-disabled={pending}
      type="submit"
    >
      Sign in
    </button>
  );
}
