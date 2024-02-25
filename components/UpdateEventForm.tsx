'use client';

import { updateEvent } from '@/app/lib/event-action';
import Link from 'next/link';
import { useState } from 'react';
import ActionButton from '@/components/ActionButton';

interface IProps {
  id: string;
  title: string;
  description: string;
  location: string;
  startAt: number;
  endAt: number;
}

export default function UpdateEventForm(props: IProps) {
  //const event: Event = await getEventDetail(eventId);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [location, setLocation] = useState(props.description);
  const [startAt, setStartAt] = useState(
    new Date(props.startAt).toISOString().slice(0, -1),
  );
  const [endAt, setEndAt] = useState(
    new Date(props.startAt).toISOString().slice(0, -1),
  );

  return (
    <div>
      <form action={updateEvent} className="max-w-sm mx-auto">
        <div className="mb-5">
          <input
            required
            type="text"
            name="id"
            value={props.id}
            className="hidden"
          />
          <label className="block mb-2 text-sm font-medium text-white">
            Title
          </label>
          <input
            required
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Description
          </label>
          <textarea
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Location
          </label>
          <input
            required
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Start At
          </label>
          <input
            required
            type="datetime-local"
            name="startAt"
            value={startAt}
            min={new Date().toISOString().slice(0, -1)}
            onChange={(e) =>
              setStartAt(new Date(e.target.value).toISOString().slice(0, -1))
            }
            className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            End At
          </label>
          <input
            required
            type="datetime-local"
            name="endAt"
            value={endAt}
            min={startAt}
            onChange={(e) =>
              setEndAt(new Date(e.target.value).toISOString().slice(0, -1))
            }
            className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-2.5">
          <button
            type="submit"
            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Update
          </button>
        </div>
      </form>
      <div className="flex flex-col space-y-2.5 mt-4">
        <ActionButton actionType="DELETE" eventId={props.id} />
        <Link
          href={'/home/event/'}
          className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-800"
        >
          <button type="button">Back</button>
        </Link>
      </div>
    </div>
  );
}
