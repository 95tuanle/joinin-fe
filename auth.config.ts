import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/sign-in',
  }, callbacks: {
    authorized({auth, request: {nextUrl}}) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith('/home');
      if (isOnHome) {
        return isLoggedIn;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/home', nextUrl));
      }
      return true;
    },
  }, providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;