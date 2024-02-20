'use client';

import UpdateEventForm from '@/components/UpdateEventForm';

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-10">
      <h1 className="text-3xl">Modify Event</h1>
      <UpdateEventForm eventId={params.slug} />
    </div>
  );
}
