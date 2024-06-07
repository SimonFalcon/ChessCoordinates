import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

export default function Header() {
    return(
        <header className='flex items-center gap-5 p-4 justify-center bg-gray-200'>
        {<img src={logo} className='object-contain w-14'/>}
        <Link className='font-bold text-xl' to='/'>ChessCoordinates</Link>
        <div className='flex gap-4 p-1 '>
          <Link className='hover:text-green-600 m-3 font-bold text-l'to={'/play'}>Play</Link>
          <Link className='hover:text-green-600 m-3 font-bold text-l'to={'/statistics'}>Statistics</Link>
          <Link className='hover:text-green-600 m-3 font-bold text-l'to={'/user'}>User</Link>
        </div>
        <div>
          <Link className='hover:text-green-600 m-3 font-bold text-l 'to={'/login'}>Login</Link>
        </div>
      </header>
    );
}