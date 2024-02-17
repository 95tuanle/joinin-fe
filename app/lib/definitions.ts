import { Session } from 'next-auth';

export type CustomSession = Session & {
  user?: {
    email?: string;
  };
  expires?: string;
  email?: string;
  sub?: string;
  _id?: string;
  firstName?: string;
  lastName?: string;
  oauthProvider?: string;
  oauthId?: string;
  role?: string;
  __v?: number;
  events?: string[];
  access_token?: string;
  id?: string;
  iat?: number;
  exp?: number;
  jti?: string;
};
