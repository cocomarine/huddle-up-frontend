import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import SignUp from "./SignUp";
import Login from "./Login";
import Logout from "./Logout";
import Home from "./Home";
import Navbar from "./Navbar";
import MyProfile from "./MyProfile";
import JoinEvents from "./JoinEvents";
import MyEvents from "./MyEvents";
import LogOut from "./Logout";
import CreateEvent from "./CreateEvent/CreateEvent";
import InviteFriends from "./InviteFriends";
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
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/logout"
              element={user ? <Logout /> : <Navigate to="/" />}
            ></Route>
            <Route path="/myProfile" element={<MyProfile />}></Route>
            <Route path="/joinevents" element={<JoinEvents />}></Route>
            <Route path="/myevents" element={<MyEvents />}></Route>
            <Route path="/createevent" element={<CreateEvent />}></Route>
            <Route path="/InviteFriends" element={<InviteFriends />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
