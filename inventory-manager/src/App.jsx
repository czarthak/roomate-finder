import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import {
  DeleteUser,
  Login,
  Register,
  UpdatePassword,
} from "./components/user/index";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/deleteUser" element={<DeleteUser />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
      </Routes>
    </div>
  );
}

export default App;
