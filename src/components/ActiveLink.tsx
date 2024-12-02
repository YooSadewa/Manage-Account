'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
}

export default function ActiveLink({ href, children }: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="text-sm/6 font-semibold text-white">
      {children}
    </Link>
  );
}