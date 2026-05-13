import { Suspense } from 'react';
import { Loading } from '@/app/ui/loading';
import UpcomingEvents from '@/app/ui/home/upcoming-events';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Upcoming events</h1>
      </div>

      <Suspense fallback={<Loading />}>
        <UpcomingEvents />
      </Suspense>
    </div>
  );
}
