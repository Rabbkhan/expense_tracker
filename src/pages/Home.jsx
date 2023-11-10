import { Link } from "react-router-dom";

const Home = () => {
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
          src="https://money.pro/img/moneypro_mac.png" // Replace with your image URL
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
      </div>
      {/* <div className="mt-8">
        <p className="text-lg text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-700 font-bold hover:underline"
          >
            Log in
          </Link>{" "}
          and start managing your expenses.
        </p>
      </div> */}
      {/* <div className="mt-8">
        <p className="text-gray-600">
          Learn how to use the{" "}
          <Link
            to="/help"
            className="text-pink-700 font-bold hover:underline"
          >
            Expense Tracker
          </Link>{" "}
          efficiently.
        </p>
      </div> */}
    </div>
  );
};

export default Home;

