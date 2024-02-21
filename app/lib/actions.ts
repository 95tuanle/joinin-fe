'use server';

import { auth, signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import {
  CreateEventState,
  CustomSession,
  UserSignInState,
  UserSignUpState,
} from '@/app/lib/definitions';
import { revalidatePath } from 'next/cache';

const UserSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function authenticate(
  userSignInState: UserSignInState,
  formData: FormData,
) {
  const parsedFormData = UserSignInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsedFormData.success) {
    return {
      errors: parsedFormData.error.flatten().fieldErrors,
      message: 'Invalid credentials.',
    };
  }
  try {
    await signIn('credentials', parsedFormData.data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function handleSignOut() {
  await signOut();
}

const UserSignUpSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signUp(
  userSignUpState: UserSignUpState,
  formData: FormData,
) {
  const parsedFormData = UserSignUpSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsedFormData.success) {
    return {
      errors: parsedFormData.error.flatten().fieldErrors,
      message: 'Invalid credentials.',
    };
  }
  try {
    const signUpResponse = await fetch(
      `${process.env.JOININ_BE_API_URL}/auth/sign-up`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: parsedFormData.data.firstName,
          lastName: parsedFormData.data.lastName,
          email: parsedFormData.data.email,
          password: parsedFormData.data.password,
        }),
      },
    );
    if (!signUpResponse.ok) {
      console.error('Failed to sign up:', await signUpResponse.json());
      return { message: 'Failed to sign up.' };
    }
  } catch (error) {
    console.error('Failed to sign up:', error);
    return { message: 'Failed to sign up.' };
  }
  redirect('/sign-in');
}

export async function handleJoinEvent(_id: string) {
  const session = (await auth()) as CustomSession;
  const joinEventResponse = await fetch(
    `${process.env.JOININ_BE_API_URL}/event/join/${_id}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${session.access_token}` },
    },
  );
  if (!joinEventResponse.ok) {
    console.error('Failed to join event:', await joinEventResponse.json());
    return { message: 'Failed to join event.' };
  }
  revalidatePath('/home');
}

export async function handleLeaveEvent(_id: string) {
  const session = (await auth()) as CustomSession;
  const leaveEventResponse = await fetch(
    `${process.env.JOININ_BE_API_URL}/event/leave/${_id}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${session.access_token}` },
    },
  );
  if (!leaveEventResponse.ok) {
    console.error('Failed to leave event:', await leaveEventResponse.json());
    return { message: 'Failed to leave event.' };
  }
  revalidatePath('/home/joined-events');
}

const CreateEventSchema = z
  .object({
    title: z.string().min(2),
    description: z.string().min(2),
    location: z.string().min(2),
    startAt: z
      .string()
      .transform((value) => {
        console.log(value, 'value raw');
        return new Date(value).getTime();
      })
      .refine(
        (value) => {
          console.log(value, 'value');
          console.log(Date.now(), 'Date.now()');
          return value > Date.now();
        },
        {
          message: 'Start date must be in the future',
        },
      ),
    endAt: z.string().transform((value) => new Date(value).getTime()),
  })
  .refine((data) => data.startAt < data.endAt, {
    message: 'End date must be after start date',
    path: ['endAt'],
  });

export async function createEvent(
  createEventState: CreateEventState,
  formData: FormData,
) {
  const parsedFormData = CreateEventSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    location: formData.get('location'),
    startAt: formData.get('startAt'),
    endAt: formData.get('endAt'),
  });
  if (!parsedFormData.success) {
    return {
      errors: parsedFormData.error.flatten().fieldErrors,
      message: 'Invalid event details.',
    };
  }
  const session = (await auth()) as CustomSession;
  try {
    const createEventResponse = await fetch(
      `${process.env.JOININ_BE_API_URL}/event`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          title: parsedFormData.data.title,
          description: parsedFormData.data.description,
          location: parsedFormData.data.location,
          startAt: parsedFormData.data.startAt,
          endAt: parsedFormData.data.endAt,
        }),
      },
    );
    if (!createEventResponse.ok) {
      console.error(
        'Failed to create event:',
        await createEventResponse.json(),
      );
      return { message: 'Failed to create event.' };
    }
  } catch (error) {
    console.error('Failed to create event:', error);
    return { message: 'Failed to create event.' };
  }
  redirect('/home');
}
