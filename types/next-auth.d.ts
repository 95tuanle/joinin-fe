declare module 'next-auth' {
  interface Session {
    access_token: string;
  }
}
