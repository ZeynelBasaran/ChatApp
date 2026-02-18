
import LocaleSwitcher from './LocaleSwitcher.jsx';
import ToggleTheme from './ToggleTheme.jsx'


const Navbar = () => {

  return (
    <nav className='h-20 flex justify-between items-center  max-w-360 w-full lg:px-20 md:px-8 px-4  border-b border-base-content/10 '>
      <h1 className='
      text-white' >Logo</h1>
 
      <div className='flex gap-4 items-center'>
        <ToggleTheme />
        <LocaleSwitcher />
      </div>


    </nav>
  )
}

export default Navbar;