import { Link } from "react-router-dom";
import { useContext,} from "react";
import AuthContext from "../authcontext/authcontext";
const Home = () => {

  const authCtx = useContext(AuthContext)

  const handleResendVerification = async () => {
    try {
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBOHmI4S1eeBK4wrP1WlGvI-JosSRP8YCQ', {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          requestType: 'VERIFY_EMAIL',
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error.message || 'Failed to send verification email');
      }
  
      alert('Verification email sent. Please check your email.');
  
    } catch (error) {
      // Handle errors
      console.error('Error sending verification email:', error.message);
      // You can show an error message to the user or handle it in another way
    }
  };
  

  return (
    <div className="text-center mt-8">
      <h1 className="text-4xl font-bold text-pink-700 mb-4">
        Welcome to Expense Tracker
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Track your expenses effortlessly and gain control of your finances.
      </p>
      <div className="flex justify-center items-center mb-8">
        <img
          src="https://money.pro/img/moneypro_mac.png"
          alt="Expense Tracker"
          className="w-auto h-64"
        />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <p className="text-lg text-gray-600">
          Your financial journey starts here. Lets get started!
        </p>
        <Link
          to="/profile"
          className="text-pink-700 font-bold text-lg hover:underline"
        >
          Complete your profile
        </Link>
        {/* Add the email verification link */}
        <p className="text-lg text-gray-600">
          Verify your email address to access all features.{" "}
          {/* <Link to="/emailverification"> */}

          <button
            onClick={handleResendVerification}
            className="text-pink-700 font-bold hover:underline"
            >
            Resend verification email
          </button>
            {/* </Link> */}
        </p>
      </div>
    </div>
  );
};

export default Home;
