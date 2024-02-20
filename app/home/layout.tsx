import React from 'react';
import NavBar from '@/app/ui/nav-bar';
import { auth } from '@/auth';
import { CustomSession } from '@/app/lib/definitions';

const links = [
  { name: 'Home', href: '/home' },
  { name: 'Create event', href: '/home/create-event' },
  {
    name: 'Joined events',
    href: '/home/joined-events',
  },
];
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as CustomSession;

  return (
    <>
      <NavBar links={links} firstName={session.firstName} />
      {children}
    </>
  );
}
