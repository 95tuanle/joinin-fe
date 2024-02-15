'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'JoinIn', href: '/' },
  { name: 'Sign in', href: '/sign-in' },
  { name: 'Sign up', href: '/sign-up' },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col px-4 py-4">
      <div className="flex grow flex-row justify-between space-x-2 text-black">
        {links.map(({ href, name }) => (
          <Link
            key={name}
            href={href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-gray-600',
              {
                'bg-sky-100 text-gray-600': pathname === href,
              },
            )}
          >
            <p>{name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
