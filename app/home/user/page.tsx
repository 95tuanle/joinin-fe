import { auth } from '@/auth';
import { CustomSession } from '@/app/lib/definitions';
import { handleSignOut } from '@/app/lib/actions';

export default async function Page() {
  const session = (await auth()) as CustomSession;

  return (
    <main className="flex flex-col items-center justify-center space-y-10 p-12">
      <div>
        <p className="text-4xl font-black text-gray-900 dark:text-white">
          User Info
        </p>
      </div>
      <p>Email:{session.email}</p>
      <p>First Name: {session.firstName}</p>
      <p>Last Name: {session.lastName}</p>
      <form className="text-black" action={handleSignOut}>
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-gray-600">
          Sign out
        </button>
      </form>
    </main>
  );
}
