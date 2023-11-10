import { useContext, useEffect, useState } from 'react';
import AuthContext from '../authcontext/authcontext';

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const [displayName, setDisplayName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userData, setUserData] = useState(null); // State to hold fetched user data

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBOHmI4S1eeBK4wrP1WlGvI-JosSRP8YCQ',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idToken: authCtx.token,
              returnSecureToken: true,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Error fetching user data');
        }

        const data = await response.json();
        const user = data.users[0];
        setUserData(user);
        setDisplayName(user.displayName || ''); // Set display name from fetched data
        setPhotoUrl(user.photoUrl || ''); // Set photo URL from fetched data
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, [authCtx.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBOHmI4S1eeBK4wrP1WlGvI-JosSRP8YCQ',
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: authCtx.token,
            displayName: displayName,
            photoUrl: photoUrl,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.ok) {
        // Successful update, you can handle the response here
        alert('Update success');
        setSuccessMessage('Update successful');
      } else {
        // Handle update error
        const data = await res.json();
        setError(data.error.message);
      }
    } catch (error) {
      // Handle network or other errors
      setError('An error occurred while trying to update.');
    }
  };

  return (
    <>
      <div className="block justify-center text-center">
        <h1 className="text-lg text-red-500 font-extrabold">Profile Details</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="lg:flex my-11 lg:justify-center gap-2 mx-5">
          <div>
            <label htmlFor="fullname">Full Name: &nbsp; &nbsp;</label>
            <input
              className="border-2 w-80 h-10 px-2"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter Full Name"
            />
          </div>
          <div>
            <label htmlFor="profilephoto">Profile Photo URL &nbsp; &nbsp;</label>
            <input
              className="border-2 w-80 h-10 mx-2 px-2"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              type="text"
              placeholder="Enter Image URL"
            />
          </div>
          <div>
            <button type="submit" className="border-2 bg-red-600 border-red-400 px-5 py-2 text-white">
              Update
            </button>
          </div>
          <div>
            <button className="border-2 border-red-400 px-5 py-2">Cancel</button>
          </div>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center text-lg">{successMessage}</p>
        )}
      </div>
    </>
  );
};

export default Profile;
