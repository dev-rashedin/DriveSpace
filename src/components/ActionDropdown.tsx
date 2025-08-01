'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useState } from 'react';
import { Models } from 'node-appwrite';
import { actionsDropdownItems } from '@/app/constants';
import Link from 'next/link';
import { constructDownloadUrl, constructFileUrl } from '@/lib/utils';
import { Input } from './ui/input';

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);

  const renderDialogContent = () => {
    const { value, label } = action;

    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-light-100'>
            {label}
          </DialogTitle>
          {value === 'rename' && (
            <Input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
        <DropdownMenuTrigger className='shad-no-focus cursor-pointer'>
          <Image
            src='/assets/icons/dots.svg'
            alt='dots'
            width={30}
            height={30}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className='max-w-[200px] truncate'>
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((item) => (
            <DropdownMenuItem
              key={item.value}
              className='shad-dropdown-item'
              // onClick={() => {
              //   setAction(item);

              //   if (['rename', 'share', 'delete'].includes(item.value)) {
              //     setIsModalOpen(true);
              //   }
              // }}
            >
              {item.value === 'download' ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className='flex items-center gap-3'
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={30}
                    height={30}
                  />
                  {item.label}
                </Link>
              ) : (
                <div
                  className='flex items-center gap-3'
                  onClick={() => setIsModalOpen(true)}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={30}
                    height={30}
                  />
                  {item.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};
export default ActionDropdown;
