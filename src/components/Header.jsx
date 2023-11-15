import { useContext } from 'react';
import Logo from '../assets/expense_tracker.png';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../authcontext/authcontext';

const Header = () => {
  const navigator = useNavigate();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    navigator('/login');
  };

  const Key = localStorage.getItem('email');

  return (
    <div className=" flex justify-between p-4">
      <div className="my-1">
        <Link to="/">
          <img src={Logo} width={90} alt="Expense Tracker" />
        </Link>
      </div>
      <div>
        <ul className="lg:flex hidden justify-center text-center lg:my-2 space-x-4">
          {authCtx.isLoggedIn && (
            <li className="font-semibold">
              <Link to="/" className="text-pink-700 hover:underline transition-colors duration-300">
                Home
              </Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li className="font-semibold">
              <Link to="/about" className="text-pink-700 hover:underline transition-colors duration-300">
                About
              </Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li className="font-semibold">
              <Link to="/profile" className="text-pink-700 hover:underline transition-colors duration-300">
                Profile
              </Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li className="font-semibold">
              <Link to="/expense" className="text-pink-700 hover:underline transition-colors duration-300">
                Add Expense
              </Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li className="font-semibold text-pink-700">
              {Key}
            </li>
          )}
          {authCtx.isLoggedIn ? (
            <li className="font-semibold cursor-pointer">
              <span
                className="text-pink-700 hover:underline transition-colors duration-300"
                onClick={logoutHandler}
              >
                Logout
              </span>
            </li>
          ) : (
            <li className="font-semibold text-pink-700 hover:underline transition-colors duration-300">
              <Link to="/login">Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
