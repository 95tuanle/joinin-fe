import { Suspense } from 'react';
import { Loading } from '@/app/ui/loading';
import EventDetail from '@/app/ui/home/event-detail';

export default function Page({ params: { _id } }: { params: { _id: string } }) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Event detail</h1>
      </div>
      <Suspense fallback={<Loading />}>
        <EventDetail _id={_id} />
      </Suspense>
    </div>
  );
}
