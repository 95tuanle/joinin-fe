import NextAuth, { User } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig, providers: [Credentials({
    async authorize(credentials) {
      const parsedCredentials = z
        .object({
          email: z.string().email(), password: z.string().min(8),
        })
        .safeParse(credentials);
      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data;
        const user = await signInAndGetUser(email, password);
        if (!user) return null;
        return user;
      }
      console.log('Invalid credentials');
      return null;
    },
  })],
});

async function signInAndGetUser(email: string, password: string): Promise<User | undefined> {
  try {
    const signInResponse = await fetch(`${process.env.JOININ_BE_API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (!signInResponse.ok) return undefined;
    const { access_token } = await signInResponse.json();
    const userResponse = await fetch(`${process.env.JOININ_BE_API_URL}/user`, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
    if (!userResponse.ok) return undefined;
    const { firstName, lastName } = await userResponse.json();
    return {
      name: firstName + ' ' + lastName, email: email,
    };
  } catch (error) {
    console.error('Failed to sign user in:', error);
    throw new Error('Failed to sign user in.');
  }
}
