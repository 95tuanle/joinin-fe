'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { signUp } from '@/app/lib/actions';

export default function Page() {
  const [state, dispatch] = useFormState(signUp, undefined);
  return (
    <main className="flex items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <form action={dispatch} className="space-y-3">
          <div className="text-black flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className="mb-3 text-2xl">Please sign up to continue.</h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium"
                  htmlFor="firstName"
                >
                  First name
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    required
                    aria-describedby="name-error"
                  />
                </div>
              </div>
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {typeof state === 'object' &&
                  state?.errors?.firstName &&
                  state?.errors.firstName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium"
                  htmlFor="lastName"
                >
                  Last name
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    aria-describedby="lastName-error"
                  />
                </div>
              </div>
              <div id="lastName-error" aria-live="polite" aria-atomic="true">
                {typeof state === 'object' &&
                  state?.errors?.lastName &&
                  state?.errors.lastName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
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
            <SignUpButton />
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {typeof state === 'string' ? (
                <p className="text-sm text-red-500">{state}</p>
              ) : (
                typeof state === 'object' &&
                state !== null && (
                  <p className="text-sm text-red-500">{state.message}</p>
                )
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="mt-4 w-full hover:bg-sky-100 text-gray-600"
      aria-disabled={pending}
      type="submit"
    >
      Sign up
    </button>
  );
}
