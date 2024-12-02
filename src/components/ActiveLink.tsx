'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  additionalClass?: string; // Tambahkan props untuk kelas tambahan
}

export default function ActiveLink({
  href,
  children,
  additionalClass = '', // Defaultnya string kosong
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${additionalClass} ${isActive ? 'text-yellow-400' : ''}`} // Gabungkan kelas tambahan dan kelas kondisi
    >
      {children}
    </Link>
  );
}
