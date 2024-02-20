'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { NavBarProps } from '@/app/lib/definitions';
import { handleSignOut } from '@/app/lib/actions';

export default function NavBar({ links, firstName }: NavBarProps) {
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
            {name}
          </Link>
        ))}
        {firstName ? (
          <form className="text-black" action={handleSignOut}>
            <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-gray-600">
              Sign out of {firstName}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
