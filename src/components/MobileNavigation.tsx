"use client"
import {
 Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from "@radix-ui/react-separator";
import Logo from './ui/logo';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import FileUploader from './FileUploader';
import { Button } from './ui/button';


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
  const pathname = useParams();

  console.log('pathname', pathname);
  

  return (
    <>
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
          <SheetContent className='shad-sheet h-screen px-3'>
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
                  <p className='caption'>{email}</p>
                </div>
              </div>
              <Separator className="mb-4 h-px bg-light-200/50" />

              <div className='flex flex-col justify-between gap-5 pb-5'>
                <FileUploader ownerId={ownerId} accountId={accountId} />
                <Button
                  type='submit'
                  className='mobile-sign-out-button'
                  // onClick={async () => await signOutUser()}
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
            </SheetTitle>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
};
export default MobileNavigation;
