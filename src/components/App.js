import "../styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
