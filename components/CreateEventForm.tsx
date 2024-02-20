import { createEvent } from '@/app/lib/event-action';

export default function CreateEventForm() {
  return (
    <form action={createEvent}>
      <label>Event Name</label>
      <input required name="title" />
      <label>Description</label>
      <input required name="description" />
      <label>Event Venue</label>
      <input required name="location" />
      <label>Start Date</label>
      <input required type="datetime-local" name="startAt" />
      <label>End Date</label>
      <input required type="datetime-local" name="endAt" />
      <button type="submit">Create</button>
    </form>
  );
}
