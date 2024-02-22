import { Suspense } from 'react';
import { Loading } from '@/app/ui/loading';
import UpcomingEvents from '@/app/ui/home/upcoming-events';

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Upcoming events</h1>
      </div>
      {/*<div className="mt-4 flex items-center justify-between gap-2">*/}
      {/*  <Search placeholder="Search events..." />*/}
      {/*  <CreateEvent />*/}
      {/*</div>*/}
      <Suspense fallback={<Loading />}>
        <UpcomingEvents />
      </Suspense>
      {/*<div className="mt-5 flex w-full justify-center">*/}
      {/*  <Pagination totalPages={totalPages} />*/}
      {/*</div>*/}
    </div>
  );
}
