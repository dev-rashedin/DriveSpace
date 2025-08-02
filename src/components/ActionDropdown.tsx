'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { constructDownloadUrl } from '@/lib/utils';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { renameFile, updateFileUsers } from '@/lib/actions/file.actions';
import { usePathname } from 'next/navigation';
import { FileDetails, ShareInput } from './ActionsModalContent';

const ActionDropdown = ({ file }: { file: Models.Document }) => {

  const path = usePathname()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropDownOpen(false);
    setAction(null);
    setName(file.name);
    // setEmails([])
  };

  const handleAction = async () => {
    if (!action) return null;
    setIsLoading(true);
    let success = false;

    const actions = {
      rename: () =>
        renameFile({ fileId: file.$id, name, extension: file.extension, path }),
      share: () => updateFileUsers({ fileId: file.$id, path}),
      delete: () => console.log('delete'),
    };
  
  success = await actions[action.value as keyof typeof actions]();

  if (success) closeAllModals();

  setIsLoading(false);

  };

  const handleRemoveUser = () => {

  }

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent className='shad-dialog button'>
        <DialogHeader className='flex flex-col gap-3'>
          <DialogTitle className='text-center text-light-100'>
            {label}
          </DialogTitle>
{/* if value is rename then show input */}
          {value === 'rename' && (
            <Input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

{/* if value is details then show file details */}
          {value === 'details' && (
            <FileDetails file={file} />
          )}
{/* if value is share then show share input */}
          {value === 'share' && (<ShareInput file={file} onInputChange={setEmails} onRemove={handleRemoveUser} />)}

        </DialogHeader>
        {['rename', 'share', 'delete'].includes(value) && (
          <DialogFooter className='flex flex-col gap-3 md:flex-row'>
            <Button variant='outline' className='border border-brand' onClick={closeAllModals}>
              Cancel
            </Button>
            <Button className='bg-brand' onClick={handleAction}>
              {isLoading ? (
                <Image
                  src='/assets/icons/loader.svg'
                  alt='loader'
                  width={24}
                  height={24}
                  className='animate-spin'
                />
              ) : (
                <p className='capitalize'>{value}</p>
              )}
            </Button>
          </DialogFooter>
        )}
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
              onClick={() => {
                setAction(item);
              }}
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
