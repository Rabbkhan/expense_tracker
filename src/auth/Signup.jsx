import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
    if(password == confirmpassword){
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
        alert("Signup success");
        navigate("/login");
      } else {
        const data = await res.json();
        setError(data.error.message);
      }
      }else{
        alert('Entered Confirm Password Same')
      }
    } catch (error) {
    
      setError("An error occurred while trying to sign up.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center h-auto ">
      <div className="bg-white w-full md:w-96 p-8 rounded-lg shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-pink-600">Sign Up</h1>
        </div>
        <form onSubmit={submitHandler}>
          {error && <p className="text-pink-600 mb-4 text-center">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-pink-600 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-600 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-3 py-2 border border-pink-600 rounded-md"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-Enter Your Password"
            />
          </div>
          <div className="mb-4 text-center">
            <button
              className="bg-pink-800 text-white px-4 py-2 rounded-md w-full"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign Up"}
            </button>
          </div>
          <div className="text-center">
            <p>
              Have an Account?{" "}
              <Link to="/login" className="text-pink-500">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default SignUp;
