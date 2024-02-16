'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';

const UserSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function authenticate(
  state:
    | string
    | {
        errors: {
          email?: string[] | undefined;
          password?: string[] | undefined;
        };
        message: string;
      }
    | undefined,
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
