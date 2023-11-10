import { useState } from "react";
const ForgotePassoword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const ForgotePassowordHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBOHmI4S1eeBK4wrP1WlGvI-JosSRP8YCQ', {
        method: 'POST',
        body: JSON.stringify({
          email,
          requestType: 'PASSWORD_RESET',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error.message || 'Failed to send a password reset email');
      }
  
      alert('A password reset link has been sent to your email');
  
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      // Handle errors, show an error message to the user, or handle it in another way
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto">
      <div className="text-3xl font-bold text-gray-800 mb-4">Reset Password</div>
      <form onSubmit={ForgotePassowordHandler} className="flex flex-col items-center">
        <input
          className="border-2 rounded-md p-2 mb-4 focus:outline-none"
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default ForgotePassoword;
