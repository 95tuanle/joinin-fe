'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const UserSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type UserSignInState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | string
  | undefined;

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

type UserSignUpState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | string
  | undefined;

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
