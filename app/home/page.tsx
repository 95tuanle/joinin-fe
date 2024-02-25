// import { auth } from '@/auth';
// import { CustomSession, Event } from '@/app/lib/definitions';
// import { getAllEvent } from '@/app/lib/event-action';
// import Link from 'next/link';
// import EventCard from '@/components/EventCard';

// export default async function Page() {
//   const session = (await auth()) as CustomSession;
//   const events: Array<Event> | { message: string } = await getAllEvent();
//   let contents;
//   if (typeof events === 'object' && 'message' in events) {
//     contents = <div> {events.message} </div>;
//   } else {
//     contents = events.map((event) => (
//       <EventCard key={event._id} event={event} />
//     ));
//   }

//   return (
//     <main className="flex flex-col items-center justify-center space-y-10 p-12">
//       <div>
//         <p className="text-4xl font-black text-gray-900 dark:text-white">
//           Upcoming Event
//         </p>
//       </div>
//       <div className="w-full grid grid-cols-1 gap-4 justify-between md:grid-cols-2 lg:grid-cols-3">
//         {contents}
//       </div>
//     </main>

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
