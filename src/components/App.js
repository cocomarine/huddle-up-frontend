import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import Navbar from "./Navbar";
import MyProfile from "./MyProfile";
import JoinEvents from "./JoinEvents";
import MyEvents from "./MyEvents";
import LogOut from "./Logout";

import "../styles/app.css";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/myprofile" element={<MyProfile />}></Route>
            {/* <Route
              path="/myProfile"
              element={user ? <MyProfile /> : <Navigate to="/login" />}
            /> */}
            <Route
              path="/joinevents"
              element={user ? <JoinEvents /> : <Navigate to="/login" />}
            />
            <Route
              path="/myevents"
              element={user ? <MyEvents /> : <Navigate to="/login" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
