import { User } from '@/app/lib/definitions';

export function formatDateToLocal(date: number) {
  return new Date(date).toLocaleString();
}

export function didUserJoinEvent(participants: Array<User>, userId: string) {
  for (const participant of participants)
    if (participant._id === userId) return true;
  return false;
}
