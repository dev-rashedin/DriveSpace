"use client"

import {
  Dialog,
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

const ActionDropdown = ({file} : {file: Models.Document}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

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
          {actionsDropdownItems.map((item) => 
          (
             <DropdownMenuItem key={item.value}>
            {item.label}
            </DropdownMenuItem>
           )
          )
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};
export default ActionDropdown;
