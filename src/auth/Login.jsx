// import { Link } from "react-router-dom";
import Bgpattern from "../assets/bg-pattern.png";
const Login = () => {
  return (
    <div className="text-slate-950 py-16 flex justify-around">
      <div>
        <img className="opacity-50 h-96 w-96 justify-center lg:mx-44" src={Bgpattern}  alt="" />
      </div>
      <div>
        <h1 className="lg:mx-96 max-w-full absolute top-44  left-36 font-extrabold text-3xl text-s text-center max-h-screen border-b-4  border-red-400 text-red-400 ">
          Sign Up
        </h1>
        <form className="lg:mx-96 max-w-full absolute top-48 left-36 font-extrabold text-center my-9 max-h-screen">
            <div className="my-5">
          <label className="text-slate-50  float-left">Email &nbsp;</label>
          <input className="p-2 border border-indigo-600" type="email" placeholder="Enter Your Mail" />
            </div>
            <div className="my-5">
          <label className="text-slate-50 float-left">Password &nbsp;</label>
          <input className="p-2 border border-indigo-600" type="password" placeholder="Enter the Password" />
            </div>
            <div >
          <label className=" text-slate-50 float-left">Confirm Password &nbsp;</label>
          <input className="p-2 border border-indigo-600" type="password" placeholder="Re-Enter the Password" />
            </div>
            <div className="my-5 ml-7">
          <button className="bg-red-500 text-slate-50 px-5 py-2 rounded-md">Sign Up</button>
            </div>
            <div className=" p-2  lg:mx-20 ">
                <p>Have an Acount ? 
                     {/* <Link to="/Signin"> */}
                    Login
                    {/* </Link>  */}
                    </p>
            </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
