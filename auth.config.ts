import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isSignedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith('/home');
      if (isOnHome) {
        return isSignedIn;
      } else if (isSignedIn) {
        return Response.redirect(new URL('/home', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
