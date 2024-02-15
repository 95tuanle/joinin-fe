import NextAuth, { User } from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

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
          .safeParse(credentials)
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const token = await signInAndGetToken(email, password)
          console.log('token:', token)
          if (!token) return null
          return token
        }
        console.log('Invalid credentials')
        return null
      },
    }),
  ],
})

async function signInAndGetToken(
  email: string,
  password: string
): Promise<User | undefined> {
  try {
    const authResponse = await fetch(
      `${process.env.JOININ_BE_API_URL}/auth/sign-in`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      }
    )
    if (!authResponse.ok) return undefined
    return await authResponse.json()
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}
