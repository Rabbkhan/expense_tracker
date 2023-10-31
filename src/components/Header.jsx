import { useContext } from 'react';
import Logo from '../assets/expense_tracker.png'
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../authcontext/authcontext';
// import Profile from '../pages/Profile';

const Header = () => {
  const navigator =useNavigate
  const authCtx = useContext(AuthContext)
  const logoutHandler = ()=>{
    authCtx.logout();
    navigator('/login')
  }
  const Key = localStorage.getItem('email')
  return (
    <div className="bg-white-700 flex justify-between px-20">
        <div className='my-1'> <Link to='/'><img src={Logo} width={70} alt=""/> </Link></div>
        <div className=''>
            <ul className='lg:flex hidden justify-center text-center lg:my-6   '>
                <li className='font-semibold mx-3'><Link to='/'>Home</Link> </li>
                <li className='font-semibold mx-3'><Link to='/profile'>Profile</Link></li>
                <li className='font-semibold mx-3'><Link to='/expense'>Add Expense</Link></li>
             {authCtx.isLoggedIn &&   <li className='font-semibold mx-3'>{Key}</li>}
                {authCtx.isLoggedIn ? (
            <li
            className='font-semibold mx-3'
            
              onClick={logoutHandler}
            >
              {" "}
              <Link to="/login" >logout </Link>
            </li>
          ) : (
            <li className='font-semibold mx-3'>
              <Link to={"/login"}>Signin</Link>
            </li>
          )}
          <ul>
            <li className='border-2 border-red-500 rounded-3xl w-12 h-12 -my-2'><img className='rounded-full w-14 h-11' src='https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698278400&semt=ais' alt='profile'></img></li>
          </ul>

                
            </ul>
        </div>
        
           </div>
  )
}

export default Header