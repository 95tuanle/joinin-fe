export async function getAllEvent() {
  const res = await fetch(`${process.env.JOININ_BE_API_URL}/event`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    console.error('Failed to fetch all event:', await res.json());
    return { message: 'Failed to fetch all event' };
  }
  const data = await res.json();
  return data;
}

export async function joinEvent() {
  const res = await fetch(`${process.env.JOININ_BE_API_URL}/auth/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    console.error('Failed to create event:', await res.json());
    return { message: 'Failed to create' };
  }
}

export async function quitEvent() {
  const res = await fetch(`${process.env.JOININ_BE_API_URL}/auth/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    console.error('Failed to create event:', await res.json());
    return { message: 'Failed to create' };
  }
}

export async function createEvent() {
  const res = await fetch(`${process.env.JOININ_BE_API_URL}/auth/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    console.error('Failed to create event:', await res.json());
    return { message: 'Failed to create' };
  }
}
