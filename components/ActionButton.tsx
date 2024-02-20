'use client';

import { deleteEvent } from '@/app/lib/event-action';
import Link from 'next/link';

enum ActionType {
  DELETE = 'DELETE',
  JOIN = 'JOIN',
  QUIT = 'QUIT',
  UPDATE = 'UPDATE',
  EDIT = 'EDIT',
}

interface IProps {
  eventId: String;
  actionType: String;
}

export default function ActionButton({ eventId, actionType }: IProps) {
  switch (actionType) {
    case ActionType.DELETE:
      return (
        <button
          className="bg-red-600 items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 hover:bg-red-700 focus:ring-red-800"
          onClick={() => deleteEvent(eventId)}
        >
          Delete
        </button>
      );
      break;

    case ActionType.EDIT:
      return (
        <Link
          href={`/home/event/${eventId}`}
          className="bg-slate-600 items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 hover:bg-slate-700 focus:ring-slate-800"
        >
          <button>Edit</button>
        </Link>
      );
      break;

    default:
      throw Error('not select the action type');
      break;
  }
}
