import { CustomSession, Event } from '@/app/lib/definitions';
import { fetchUpcomingEvents } from '@/app/lib/data';
import { auth } from '@/auth';
import { handleJoinEvent } from '@/app/lib/actions';
import { didUserJoinEvent, formatDateToLocal } from '@/app/lib/utilities';

export default async function Page() {
  const upcomingEvents = await fetchUpcomingEvents();
  const session = (await auth()) as CustomSession;
  const currentUserId = session._id;
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Upcoming events</h1>
      </div>
      {/*<div className="mt-4 flex items-center justify-between gap-2">*/}
      {/*  <Search placeholder="Search events..." />*/}
      {/*  <CreateEvent />*/}
      {/*</div>*/}
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
                    <td className="whitespace-nowrap px-3 py-3">
                      {event.organizer._id !== currentUserId &&
                      !didUserJoinEvent(event.participants, currentUserId) ? (
                        <div className="flex justify-end gap-3">
                          <form action={handleJoinEvent.bind(null, event._id)}>
                            <button className="rounded-md border p-2 hover:bg-gray-100">
                              Join
                            </button>
                          </form>
                        </div>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/*<div className="mt-5 flex w-full justify-center">*/}
      {/*  <Pagination totalPages={totalPages} />*/}
      {/*</div>*/}
    </div>
  );
}
