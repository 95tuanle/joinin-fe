import React from 'react';
import NavBar from '@/app/ui/nav-bar';
import AppBar from '@/components/AppBar';

const links = [
  { name: 'Home', href: '/home' },
  { name: 'Create event', href: '/create-event' },
  {
    name: 'Joined events',
    href: '/joined-events',
  },
];
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <NavBar links={links} isSignedIn={true} /> */}
      <AppBar />
      {children}
    </>
  );
}
