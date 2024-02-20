'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createEvent } from '@/app/lib/actions';
import Link from 'next/link';

export default function Page() {
  const [state, dispatch] = useFormState(createEvent, undefined);

  return (
    <main>
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Create event</h1>
      </div>
      <form action={dispatch}>
        <div className="text-black rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Choose a title
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  required
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter a title"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="title-error"
                />
              </div>
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.title &&
                state?.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Choose a description
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  required
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter a description"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="description-error"
                />
              </div>
            </div>
            <div id="description-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.description &&
                state?.errors.description.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium"
            >
              Choose a location
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  required
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Enter a location"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="location-error"
                />
              </div>
            </div>
            <div id="location-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.location &&
                state?.errors.location.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="startAt" className="mb-2 block text-sm font-medium">
              Choose a start date
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  required
                  id="startAt"
                  name="startAt"
                  type="datetime-local"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="startAt-error"
                />
              </div>
            </div>
            <div id="startAt-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.startAt &&
                state?.errors.startAt.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="endAt" className="mb-2 block text-sm font-medium">
              Choose an end date
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  required
                  id="endAt"
                  name="endAt"
                  type="datetime-local"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="endAt-error"
                />
              </div>
            </div>
            <div id="endAt-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.endAt &&
                state?.errors.endAt.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div aria-live="polite" aria-atomic="true">
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
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href={'/home'}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <CreateEventButton />
        </div>
      </form>
    </main>
  );
}

function CreateEventButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      aria-disabled={pending}
      type="submit"
    >
      Create event
    </button>
  );
}