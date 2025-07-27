import Image from "next/image"
import Link from "next/link";


const Logo = ({ type } : {type: 'sidebar' | 'mobile' | 'desktop'}) => {
  return (
    <Link
      href='/'
      className={`${type === 'sidebar' ? 'hidden h-auto md:flex' : ''} flex cursor-pointer items-center gap-3 `}
    >
      <Image
        src='/logo.png'
        alt='logo'
        width={type === 'sidebar' ? 50 : type === 'mobile' ? 50 : 60}
        height={type === 'sidebar' ? 40 : type === 'mobile' ? 50 : 60}
        className='h-auto'
      />
      <h1
        className={`${type === 'sidebar' ? 'hidden  text-3xl lg:block' : 'text-3xl lg:text-4xl'} font-semibold text-brand  lg:text-brown`}
      >
        DriveSpace
      </h1>
    </Link>
  );
}
export default Logo