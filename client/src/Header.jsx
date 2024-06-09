import { Link } from 'react-router-dom';
import logo from './assets/logo.png';
import { UserContext } from './UserContext';
import { useContext } from 'react';

export default function Header() {
    const {user} = useContext(UserContext);
    return(
        <header className='flex items-center gap-5 p-4 justify-center'>
        {<img src={logo} className='object-contain w-14'/>}
        <Link className='font-bold text-xl' to='/'>ChessCoordinates</Link>
        <div className='flex gap-4 p-1 '>
          <Link className='hover:text-green-600 m-3 font-bold text-l'to={'/play'}>Play</Link>
          <Link className='hover:text-green-600 m-3 font-bold text-l'to={'/user'}>
          
          </Link>
        </div>
        <div>
          <Link to={user? '/user':'/login'} className='hover:text-green-600 m-3 font-bold text-l '>
          <div>{!!user ? (<div>{user.name}</div>) : 
          (<div>Login</div>)}</div>
          </Link>
        </div>
      </header>
    );
}