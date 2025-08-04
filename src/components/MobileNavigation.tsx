'use client';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@radix-ui/react-separator';
import Logo from './ui/logo';
import { useState } from 'react';
import Image from 'next/image';
// import FileUploader from './FileUploader';
import { Button } from './ui/button';
import Link from 'next/link';
import { navItems } from '@/app/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { signOutUser } from '@/lib/actions/user.actions';
import FileUploader from './FileUploader';

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className='mobile-header'>
      <Logo type='navigation' />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src='/assets/icons/menu.svg'
            alt='Search'
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className='sheet-drawer h-screen px-3'>
          <SheetTitle>
            <div className='header-user'>
              <Image
                src={avatar}
                alt='avatar'
                width={44}
                height={44}
                className='header-user-avatar'
              />
              <div className='sm:hidden lg:block'>
                <p className='subtitle-2 capitalize'>{fullName}</p>
                <p className='caption text-light-300'>{email}</p>
              </div>
            </div>
          </SheetTitle>

          <Separator className='mb-4 h-px bg-light-300/50' />

          {/* navigation */}
          <nav className='mobile-nav'>
            <ul className='mobile-nav-list'>
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className='lg:w-full'>
                  <li
                    className={cn(
                      'mobile-nav-item',
                      pathname === url && 'nav-active'
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
                    <p className='body-1'>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          {/* file uploader & logout button */}
          <Separator className='mb-4 h-px bg-light-300/50' />
          <div className='flex flex-col justify-between gap-5 pb-5'>
            <FileUploader ownerId={ownerId} accountId={accountId} />
            <Button
              type='submit'
              className='mobile-sign-out-button'
              onClick={async () => await signOutUser()}
            >
              <Image
                src='/assets/icons/logout.svg'
                alt='logo'
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
export default MobileNavigation;
