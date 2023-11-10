import Login from "./auth/Login";
import Header from "./components/Header";
import Signup from "./auth/Signup.jsx";
import Home from "./pages/Home";
import Abouts from "./pages/Abouts";
import Editexpense from "./pages/Editexpense.jsx";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Expense from "./pages/Expense";
import ForgotePassoword from "./pages/ForgotePassoword";
import { useContext } from "react";
import AuthContext from "./authcontext/authcontext";
function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
        <Router>
          <Header />
          <Routes>
          {authCtx.isLoggedIn &&<Route path="/" index element={<Home />}></Route>}
           {authCtx.isLoggedIn && <Route path="/expense" element={<Expense />}></Route>}
           {authCtx.isLoggedIn && <Route path="/editexpense" element={<Editexpense />}></Route>}
           {authCtx.isLoggedIn && <Route path="/about" element={<Abouts />}></Route>}
            <Route path="/login/resetpassword" element={<ForgotePassoword />}></Route>
            <Route path="login" element={<Login />}></Route>
            {authCtx.isLoggedIn && <Route path="profile" element={<Profile />}></Route>}
            <Route path="signup" element={<Signup />}></Route>
          </Routes>
        </Router>
    </>
  );
}

export default App;
