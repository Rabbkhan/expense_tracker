import Login from "./auth/Login";
import Header from "./components/Header";
import Signup from "./auth/Signup.jsx";
import Home from "./pages/Home";
// import Abouts from "./pages/Abouts";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./authcontext/authcontext.jsx";
import Expense from "./pages/Expense";
import ForgotePassoword from "./pages/ForgotePassoword";
// import { useContext } from "react";
// import AuthContext from "./authcontext/authcontext";
function App() {
  // const authCtx = useContext(AuthContext);

  return (
    <>
      <AuthContextProvider>
        <Router>
          <Header />
          <Routes>
          <Route path="/" index element={<Home />}></Route>
            <Route path="/expense" element={<Expense />}></Route>
            <Route path="/login/resetpassword" element={<ForgotePassoword />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="signup" element={<Signup />}></Route>
          </Routes>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
