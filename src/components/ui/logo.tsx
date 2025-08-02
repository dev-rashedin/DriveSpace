import Image from "next/image"
import Link from "next/link";


const Logo = ({ type }: { type: 'sidebar' | 'mobile' | 'desktop' | 'navigation' }) => {
  
  const sizeMap: Record<string, number> = {
    navigation: 40,
    sidebar: 50,
    mobile: 50,
  };

  const size = sizeMap[type] ?? 60;
  


  return (
    <Link
      href='/'
      className={`${type === 'sidebar' ? 'hidden h-auto md:flex' : ''} flex cursor-pointer items-center gap-3 `}
    >
      <Image
        src='/logo.png'
        alt='logo'
        width={size}
        height={size}
        className='h-auto'
      />
      <h1
        className={`${type === 'navigation' ? 'text-xl' : type === 'sidebar' ? 'hidden text-3xl text-brown lg:block' : 'text-3xl text-brand lg:text-4xl  lg:text-brown'} font-bold `}
      >
        DriveSpace
      </h1>
    </Link>
  );
}
export default Logo