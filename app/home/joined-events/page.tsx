import { Suspense } from 'react';
import { Loading } from '@/app/ui/loading';
import JoinedEvents from '@/app/ui/home/joined-events';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Joined events</h1>
      </div>

      <Suspense fallback={<Loading />}>
        <JoinedEvents />
      </Suspense>
    </div>
  );
}
