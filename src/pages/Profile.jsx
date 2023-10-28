import { useContext, useState } from "react";
import AuthContext from "../authcontext/authcontext";
const Profile = () => {
    const authCtx = useContext(AuthContext);
    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!authCtx.token) {
            setError("User is not authenticated. Please log in.");
            return;
        }

        try {
            const requestBody = {
                name,
                profileImage,
                returnSecureToken: true,
                idToken: authCtx.token
            };

            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBOHmI4S1eeBK4wrP1WlGvI-JosSRP8YCQ', {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setSuccessMessage("Profile updated successfully");
                alert(profileImage)
                setError(null);
            } else {
                const data = await response.json();
                setError(data.error.message);
                setSuccessMessage(null);
            }
        } catch (error) {
            setError("An error occurred while updating the profile.");
            setSuccessMessage(null);
        }
    }

    return (
        <>
            <div className="block justify-center text-center">
                <h1 className="text-lg text-red-500 font-extrabold">Contact Details</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="lg:flex my-11 lg:justify-center gap-2 mx-5">
                    <div>
                        <label htmlFor="fullname">Full Name: &nbsp; &nbsp;</label>
                        <input
                            className="border-2 w-80 h-10 px-2"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Full Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="profilephoto">Profile Photo URL &nbsp; &nbsp;</label>
                        <input
                            className="border-2 w-80 h-10 mx-2 px-2"
                            value={profileImage}
                            onChange={(e) => setProfileImage(e.target.value)}
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
                        <button className="border-2 border-red-400 px-5 py-2">
                            Cancel
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-500">{error}</p>}
                {successMessage && <p className="text-green-500 text-center text-lg">{successMessage}</p>}

            </div>
          
        </>
    );
};

export default Profile;