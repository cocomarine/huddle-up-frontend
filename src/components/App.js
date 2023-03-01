import "../styles/app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Home from "./Home";
import Navbar from "./Navbar";
import MyProfile from "./MyProfile";
import JoinEvents from "./JoinEvents";
import MyEvents from "./MyEvents";

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/myProfile" element={<MyProfile />}></Route>
            <Route path="/joinevents" element={<JoinEvents />}></Route>
            <Route path="/myevents" element={<MyEvents />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      <div>
      {/* <BrowserRouter>
          <Routes>
      <Route path="/" element={<Home />}></Route>
      </Routes>
        </BrowserRouter> */}
      </div>
    </div>
  );
}

export default App;
