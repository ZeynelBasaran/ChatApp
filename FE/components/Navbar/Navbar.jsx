
import LocaleSwitcher from './LocaleSwitcher.jsx';
import ToggleTheme from './ToggleTheme.jsx'


const Navbar = () => {

  return (
    <nav className='h-20 flex justify-between items-center bg-pink-300 max-w-[1440px] w-full lg:px-20 md:px-8 px-4'>
      <h1 >Logo</h1>
 
      <div className='flex gap-4 items-center'>
        <ToggleTheme />
        <LocaleSwitcher />
      </div>


    </nav>
  )
}

export default Navbar;