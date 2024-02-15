import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email, password);
          if (!user) return null;
          return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      return { ...session, ...token };
    },
  },
  secret: process.env.AUTH_SECRET,
});

async function getUser(
  email: string,
  password: string,
): Promise<any | undefined> {
  try {
    const access_token = await signInAndGetToken(email, password);
    const userResponse = await fetch(`${process.env.JOININ_BE_API_URL}/user`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (!userResponse.ok) return undefined;
    const user = await userResponse.json();
    user.access_token = access_token;
    return user;
  } catch (error) {
    console.error('Failed to get user:', error);
    throw new Error('Failed to get user.');
  }
}

export async function signInAndGetToken(
  email: string,
  password: string,
): Promise<string | undefined> {
  try {
    const signInResponse = await fetch(
      `${process.env.JOININ_BE_API_URL}/auth/sign-in`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      },
    );
    if (!signInResponse.ok) return undefined;
    const { access_token } = await signInResponse.json();
    return access_token;
  } catch (error) {
    console.error('Failed to sign user in:', error);
    throw new Error('Failed to sign user in.');
  }
}
