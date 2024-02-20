import NavBar from '@/app/ui/nav-bar';
import React from 'react';

const links = [
  { name: 'JoinIn', href: '/' },
  { name: 'Sign in', href: '/sign-in' },
  {
    name: 'Sign up',
    href: '/sign-up',
  },
];
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar links={links} isSignedIn={false} />
      {children}
    </>
  );
}
