import { Event } from '@/app/lib/definitions';
import { fetchJoinedEvents } from '@/app/lib/data';
import { handleLeaveEvent } from '@/app/lib/actions';
import { formatDateToLocal } from '@/app/lib/utilities';
import Link from 'next/link';

export default async function JoinedEvents() {
  try {
    const upcomingEvents = await fetchJoinedEvents();
    return (
      <div className="text-black mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2">
            <table className="min-w-full">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Start
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    End
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Location
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Organizer
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {upcomingEvents?.map((event: Event) => (
                  <tr
                    key={event._id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap px-3 py-3">
                      {event.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(event.startAt)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(event.endAt)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {event.location}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {event.organizer.firstName}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <form action={handleLeaveEvent.bind(null, event._id)}>
                          <button className="rounded-md border p-2 hover:bg-gray-100">
                            Leave
                          </button>
                        </form>
                        <Link
                          href={`/home/event-detail/${event._id}`}
                          className="rounded-md border p-2 hover:bg-gray-100"
                        >
                          Detail
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Failed to load events</div>;
  }
}
