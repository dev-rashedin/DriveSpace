"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { sendEmailOTP, verifySecret } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

const OTPModal = ({ accountId, email }: { accountId: string; email: string }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // call api to verify otp
      const sessionId = await verifySecret({ accountId, password })
      
      if (sessionId) {
        router.push('/')
      }

    } catch (error) {
      console.error('Failed to verify OTP', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    // call api to resend otp
    await sendEmailOTP({ email });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className='alert-dialog'>
        <AlertDialogHeader className='relative flex justify-center'>
          <AlertDialogTitle className='h2 relative text-center '>
            Enter your OTP
            <span className='otp-close-button' onClick={() => setIsOpen(false)}>
              X
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className='subtitle-1 text-center text-light-100'>
            We&apos;ve sent a code to{' '}
            <span className='pl-1 font-semibold text-brand '>
              {email}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className='shad-otp'>
            <InputOTPSlot index={0} className='shad-otp-slot' />
            <InputOTPSlot index={1} className='shad-otp-slot' />
            <InputOTPSlot index={2} className='shad-otp-slot' />
            <InputOTPSlot index={3} className='shad-otp-slot' />
            <InputOTPSlot index={4} className='shad-otp-slot' />
            <InputOTPSlot index={5} className='shad-otp-slot' />
          </InputOTPGroup>
        </InputOTP>
        <AlertDialogFooter>
          <div className='flex w-full flex-col gap-4'>
            <AlertDialogAction
              onClick={handleSubmit}
              className='otp-submit-btn h-10'
              type='button'
            >
              {loading ? (
                <Image
                  src='/assets/icons/loader.svg'
                  alt='loader'
                  width={24}
                  height={24}
                  className='ml-2 animate-spin'
                />
              ) : (
                ' Submit'
              )}
            </AlertDialogAction>
            <div className='subtitle-2 mt-2 text-center text-light-100'>
              Didn&apos;t get a code?
              <Button
                type='button'
                variant='link'
                className='pl-1.5 font-semibold text-brand '
                onClick={handleResendOtp}
              >
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default OTPModal;
