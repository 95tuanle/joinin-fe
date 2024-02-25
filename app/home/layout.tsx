import React from 'react';
import NavBar from '@/app/ui/nav-bar';
import AppBar from '@/components/AppBar';
import { auth } from '@/auth';
import { CustomSession } from '@/app/lib/definitions';

const links = [
  { name: 'Home', href: '/home' },
  {
    name: 'Joined events',
    href: '/home/joined-events',
  },
  { name: 'Create event', href: '/home/create-event' },
];
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as CustomSession;

  return (
    <>
      <AppBar />
      <NavBar links={links} firstName={session.firstName} />
      {children}
    </>
  );
}
