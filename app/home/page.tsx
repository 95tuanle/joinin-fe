import { auth } from '@/auth';
import { CustomSession } from '@/app/lib/definitions';

export default async function Page() {
  const session = (await auth()) as CustomSession;
  console.log('session', session);
  return (
    <>
      <div>Home</div>
    </>
  );
}
