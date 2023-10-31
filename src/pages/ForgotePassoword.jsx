import { useContext, useRef } from "react";
import AuthContext from "../authcontext/authcontext";
import { useNavigate } from "react-router-dom";

const ForgotePassoword = () => {
  const newPasswordInputRef = useRef();
  const Navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBOHmI4S1eeBK4wrP1WlGvI-JosSRP8YCQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log("Password Update Successfull");
        Navigate('/login');
      }
    });
  };
  return (
    <>
      <div className="text-center text-slate-950 text-xl">Reset Password</div>
      <form onSubmit={submitHandler} className="flex justify-center my-2">
        <input
          className="border-2 border-slate-950 px-2 mr-2"
          type="password"
          placeholder="Enter New Password"
          ref={newPasswordInputRef}
        />
        <button className="border-2 border-slate-950 px-2 mr-2 bg-slate-950 text-slate-50 rounded-sm">
          Update
        </button>
      </form>
    </>
  );
};

export default ForgotePassoword;
