'use client';

import Image from 'next/image';
import Link from 'next/link';
import Logo from './ui/logo';
import { avatarPlaceholderUrl, navItems } from '@/app/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();

  return (
    <aside className='sidebar'>
      {/* logo for sidebar */}
      <div className='flex h-[50px] items-center rounded-full'>
        <Logo type='sidebar' />
      </div>

      <nav className='sidebar-nav'>
        <ul className='flex flex-1 flex-col gap-6'>
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className='lg:w-full'>
              <li
                // className={cn(
                //   'sidebar-nav-item',
                //   pathname === url && 'nav-active'
                // )}
                className={cn('sidebar-nav-item', pathname === url && 'nav-active')}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  // className={cn(
                  //   'nav-icon',
                  //   pathname === url && 'nav-icon-active'
                  // )}
                  className={cn('nav-icon', pathname === url && 'nav-icon-active')}
                />
                <p className='hidden lg:block'>{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image
        src='/assets/images/files-2.png'
        alt='user'
        width={506}
        height={418}
        className='w-full'
      />

      <div className='sidebar-user-info'>
        <Image
          src={avatar || avatarPlaceholderUrl}
          alt='Avatar'
          width={44}
          height={44}
          className='sidebar-user-avatar'
        />
        <div className='hidden lg:block'>
          <p className='subtitle-2'>{fullName}</p>
          <p className='caption'>{email}</p>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
