'use client';

import { deleteEvent } from '@/app/lib/event-action';

enum ActionType {
  DELETE = 'DELETE',
  JOIN = 'JOIN',
  QUIT = 'QUIT',
}

interface IProps {
  eventId: String;
  actionType: String;
}

const ActionButton = ({ eventId, actionType }: IProps) => {
  switch (actionType) {
    case ActionType.DELETE:
      return (
        <button
          className="bg-red-600 p-4 rounded-lg min-w-24"
          onClick={() => deleteEvent(eventId)}
        >
          Delete
        </button>
      );
      break;

    default:
      throw Error('not select the action type');
      break;
  }
};

export default ActionButton;
