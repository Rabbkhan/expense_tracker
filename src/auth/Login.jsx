import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import AuthContext from "../authcontext/authcontext";
const Login = () => {
  const navigate = useNavigate()

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [loading, setLoading] = useState(false)
  // const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext)

  const submitHandler = (event) => {
      event.preventDefault()

      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      setLoading(true)

       fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOHmI4S1eeBK4wrP1WlGvI-JosSRP8YCQ',{
          method:'POST',
          body:JSON.stringify({
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:true
          }),
          headers:{
            'content-type':"application/json"
          }
        })
        .then((res) => {
          setLoading(false)
          if(res.ok){
            return res.json();
          }else{
            return res.json().then((data) => {
              let errorMessage = 'Authentication failed';
              
              throw new Error(errorMessage)
            })
          }
        })
        .then((data) => {
          authCtx.login(data.idToken, enteredEmail)
          alert('Login successfully')
          navigate('/')
  
        })      
        .catch((err) => {
          alert(err.message)
        })
  
  } 


  return (
    <div className="h-auto flex justify-center items-center">
      <div
        className="bg-white w-full md:w-96 p-8 rounded-lg shadow-2xl relative"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-pink-700">Sign In</h1>
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-pink-600 rounded-md"
              ref={emailInputRef}
              placeholder="Enter Your Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-pink-600 rounded-md"
              ref={passwordInputRef}
              placeholder="Enter Your Password"
            />
            <span>
              <p>
                <Link to="resetpassword" className="text-pink-600">
                  Forgot Password?
                </Link>
              </p>
            </span>
          </div>
  
          <div className="mb-4 text-center">
            <button
              className="bg-pink-800 text-white px-4 py-2 rounded-md w-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <div className="text-center">
            <p>
              Dont Have an Account?{" "}
              <Link to="/Signup" className="text-pink-500">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default Login;
