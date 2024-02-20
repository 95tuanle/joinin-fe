'use server';

import { auth, signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import {
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
    await signIn('credentials', formData);
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
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          password: formData.get('password'),
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
