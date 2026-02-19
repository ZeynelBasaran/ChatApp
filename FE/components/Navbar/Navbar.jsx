
import LocaleSwitcher from './LocaleSwitcher.jsx';
import ToggleTheme from './ToggleTheme.jsx'
import Link from 'next/link.js';
import Image from 'next/image.js';

const Navbar = () => {

  return (
    <nav className='h-20 flex justify-between items-center  max-w-360 w-full lg:px-20 md:px-8 px-4  border-b border-gray-200 dark:border-white/10 '>
     <Link href={"/"} className="flex gap-x-2 justify-center items-center">
         
            <Image src={"/İconFoot.png"} alt="icon"  width={100} height={100} className="w-[50px] h-[50px]"/>

        
           <span className="text-lg font-semibold">  ChatApp</span>
            
         
          
          </Link>
 
      <div className='flex gap-4 items-center'>
        <ToggleTheme />
        <LocaleSwitcher />
      </div>


    </nav>
  )
}

export default Navbar;