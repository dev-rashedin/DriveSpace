"use client"

import Image from "next/image";
import Link from "next/link"
import Logo from "./ui/logo";
import { navItems } from "@/app/constants";
import { usePathname } from "next/navigation";
import { cn } from '@/lib/utils';



const Sidebar = () => {
    const pathname = usePathname();

  return (
    <aside className='sidebar bg-lime'>
      {/* logo for sidebar */}
      <Logo type='sidebar' />

      <nav className='sidebar-nav'>
        <ul className='flex flex-1 flex-col gap-6'>
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className='lg:w-full'>
              <li
                className={cn(
                  'sidebar-nav-item',
                  pathname === url && 'shad-active'
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    'nav-icon',
                    pathname === url && 'nav-icon-active'
                  )}
                />
                <p className='hidden lg:block'>{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
export default Sidebar