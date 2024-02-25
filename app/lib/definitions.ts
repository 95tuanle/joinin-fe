import { Session } from 'next-auth';

export type CustomSession = Session & {
  user?: {
    email?: string;
  };
  expires?: string;
  email?: string;
  sub?: string;
  _id: string;
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

export interface NavBarProps {
  links: {
    name: string;
    href: string;
  }[];
  firstName?: string;
}

export type UserSignUpState =
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

export type UserSignInState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | string
  | undefined;

// export type Event = {
export type CreateEventState =
  | {
      errors?: {
        title?: string[];
        description?: string[];
        location?: string[];
        startAt?: string[];
        endAt?: string[];
      };
      message?: string;
    }
  | string
  | undefined;

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  __v: number;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  location: string;
  startAt: number;
  endAt: number;
  organizer: User;
  isValid: boolean;
  participants: Array<User>;
  __v: number;
}

// Antony
export interface AntonyEvent {
  _id: string;
  title: string;
  description: string;
  location: string;
  startAt: number;
  endAt: number;
  organizer: string;
  isValid: boolean;
  participants: Array<String>;
  __v: number;
}
