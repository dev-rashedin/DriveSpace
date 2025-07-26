'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createAccount } from '@/lib/actions/user.actions';

type FormType = 'sign-in' | 'sign-up';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z
      .string()
      .refine((val) => emailRegex.test(val), { message: 'Invalid email' }),
    fullName:
      formType === 'sign-up'
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [accountId, setAccountId] = useState('');

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    const user = createAccount({
      fullName: values.fullName  || '',
      email: values.email,
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    };
  }
  return (
    <>
      <Form {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='auth-form mt-16 lg:mt-0'
          >
            <h1 className='form-title'>
              {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </h1>
            {type === 'sign-up' && (
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem>
                    <div className='form-item'>
                      <FormLabel className='form-label'>Full Name</FormLabel>

                      <FormControl>
                        <Input
                          placeholder='Enter your full name'
                          className='form-input'
                          {...field}
                        />
                      </FormControl>
                    </div>

                    <FormMessage className='form-message' />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <div className='form-item'>
                    <FormLabel className='form-label'>Email</FormLabel>

                    <FormControl>
                      <Input
                        placeholder='Enter your email'
                        className='form-input'
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className='form-message' />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='form-submit-button'
              disabled={isLoading}
            >
              {isLoading ? (
                <Image
                  src='/assets/icons/loader.svg'
                  alt='loader'
                  width={24}
                  height={24}
                  className='ml-2 animate-spin'
                />
              ) : type === 'sign-in' ? (
                'Sign In'
              ) : (
                'Sign Up'
              )}
            </Button>

            {errorMessage && <p className='error-message'>*{errorMessage}</p>}

            <div className='body-1 flex items-center justify-center '>
              <p className=' text-light-100 '>
                {type === 'sign-in'
                  ? "Don't have an account?"
                  : 'Already have an account?'}
              </p>
              <Link
                href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
                className='ml-2 text-base  font-semibold text-brand-200 hover:text-brand-100'
              >
                {' '}
                {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
              </Link>
            </div>
          </form>
        </Form>
      </Form>
      {/* otp verification */}
    </>
  );
};
export default AuthForm;
