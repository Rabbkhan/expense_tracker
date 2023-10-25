import { useContext } from 'react';
import Logo from '../assets/expense_tracker.png'
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../authcontext/authcontext';

const Header = () => {
  const navigator =useNavigate
  const authCtx = useContext(AuthContext)
  const logoutHandler = ()=>{
    authCtx.logout();
    navigator('/login')
  }
  return (
    <div className="bg-white-700 flex justify-between px-20">
        <div className='my-1'> <Link to='/'><img src={Logo} width={70} alt=""/> </Link></div>
        <div className=''>
            <ul className='lg:flex hidden justify-center text-center lg:my-6   '>
                <li className='font-semibold mx-3'><Link to='/'>Home</Link> </li>
                <li className='font-semibold mx-3'><Link to='#'>Products</Link></li>
                <li className='font-semibold mx-3'><Link to='/about'>About us </Link></li>
                {authCtx.isLoggedIn ? (
            <li
            
              onClick={logoutHandler}
            >
              {" "}
              <Link to="/">logout </Link>
            </li>
          ) : (
            <li>
              <Link to={"/login"}>Signin</Link>
            </li>
          )}

                
            </ul>
        </div>
        
           </div>
  )
}

export default Header