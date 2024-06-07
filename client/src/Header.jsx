import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

export default function Header() {
    return(
        <header className='flex items-center gap-5 p-4 justify-center bg-gray-200'>
        {<img src={logo} className='object-contain w-14'/>}
        <span className='font-bold text-xl'>ChessCoordinates</span>
        <div className='flex gap-4 p-1 '>
          <div className='hover:text-green-600 m-3 font-bold text-l '>Play</div>
          <div className='hover:text-green-600 m-3 font-bold text-l'>Statistics</div>
          <div className='hover:text-green-600 m-3 font-bold text-l'>User</div>
        </div>
        <div>
          <Link className='hover:text-green-600 m-3 font-bold text-l 'to={'/login'}>Login</Link>
        </div>
      </header>
    );
}