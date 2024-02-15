import { handleSignOut } from '@/app/lib/actions';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  console.log('session', session);
  return (
    <>
      <div>Home</div>
      <form className="text-black" action={handleSignOut}>
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-gray-600">
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </>
  );
}
