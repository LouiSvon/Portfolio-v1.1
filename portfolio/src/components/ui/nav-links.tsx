"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = { href: string; label: string };

// Liens de la pilule de navigation, avec la page courante mise en évidence.
export function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const path = link.href.split("#")[0];
        const isHash = link.href.includes("#");
        const active = !isHash && (pathname === path || pathname === `${path}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className="nav-link"
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
