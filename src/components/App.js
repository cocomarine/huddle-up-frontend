import "../styles/app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Home from "./Home";
import Navbar from "./Navbar";
import MyProfile from "./MyProfile";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/myProfile" element={<MyProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
