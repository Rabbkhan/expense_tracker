import { Link, useNavigate } from "react-router-dom";
import Bgpattern from "../assets/bg-pattern.png";
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
    <div className="text-slate-950 py-16 flex justify-around">
      <div>
        <img
          className=" h-96 w-96 justify-center lg:mx-44"
          src={Bgpattern}
          alt=""
        />
      </div>
      <div>
        <h1 className="lg:mx-96 max-w-full absolute top-44  left-36 font-extrabold text-3xl text-s text-center max-h-screen border-b-4  border-red-400 text-red-400 ">
          Sign In
        </h1>
        <form onSubmit={submitHandler} className="lg:mx-96 max-w-full absolute top-48 left-36 font-extrabold text-center my-9 max-h-screen">
          {/* {error && <p className="text-red-500">{error}</p>} */}
          <div className="my-5">
            <label className="text-slate-50 float-left"
            >Email &nbsp;</label>
            <input
              className="p-2 border border-indigo-600"
              type="email"
              ref={emailInputRef}
              placeholder="Enter Your Mail"
            />
          </div>
          <div className="my-5">
            <label className="text-slate-50 float-left">Password &nbsp;</label>
            <input
              className="p-2 border border-indigo-600"
              type="password"
              ref={passwordInputRef}
              placeholder="Enter the Password"
            />
            <span>
              <p>Forgot Passowrd?</p>
            </span>
          </div>

          <div className="my-5 ml-7">
            <button className="bg-red-500 text-slate-50 px-5 py-2 rounded-md" disabled={loading}>
              {loading ? 'log in....' : 'login'}
            </button>
          </div>
          <div className=" p-2  lg:mx-20 ">
            <p>
              Have an Acount ?<Link to="/Signup">&nbsp; SignUp</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
