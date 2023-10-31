import { Link, useNavigate } from "react-router-dom";
import Bgpattern from "../assets/bg-pattern.png";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassowrd, setConfirmpassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOHmI4S1eeBK4wrP1WlGvI-JosSRP8YCQ",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        // Successful login, you can handle the res here
        alert("Signup success");
        navigate("/login");
      } else {
        // Handle login error
        const data = await res.json();
        setError(data.error.message);
      }
    } catch (error) {
      // Handle network or other errors
      setError("An error occurred while trying to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-slate-950 py-16 flex justify-around">
      <div>
        <img
          className="h-96 w-96 justify-center lg:mx-44"
          src={Bgpattern}
          alt=""
        />
      </div>
      <div>
        <h1 className="lg:mx-96 max-w-full absolute top-44  left-36 font-extrabold text-3xl text-s text-center max-h-screen border-b-4  border-red-400 text-red-400 ">
          Sign Up
        </h1>
        <form
          onSubmit={submitHandler}
          className="lg:mx-96 max-w-full absolute top-48 left-36 font-extrabold text-center my-9 max-h-screen"
        >
          {error && <p className="text-red-500">{error}</p>}
          <div className="my-5">
            <label className="text-slate-50  float-left">Email &nbsp;</label>
            <input
              className="p-2 border border-indigo-600"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Mail"
            />
          </div>
          <div className="my-5">
            <label className="text-slate-50 float-left">Password &nbsp;</label>
            <input
              className="p-2 border border-indigo-600"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the Password"
            />
          </div>
          <div>
            <label className=" text-slate-50 float-left">
              Confirm Password &nbsp;
            </label>
            <input
              className="p-2 border border-indigo-600"
              type="password"
              value={confirmpassowrd}
              onChange={(e) => setConfirmpassword(e.target.value)}
              placeholder="Re-Enter the Password"
            />
          </div>

          <div className="my-5 ml-7">
            <button
              className="bg-red-500 text-slate-50 px-5 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Signin In..." : "Sign Up"}
            </button>
          </div>
          <div className=" p-2  lg:mx-20 ">
            <p>
              Have an Acount ?<Link to="/login" className="text-blue-500">&nbsp; Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
