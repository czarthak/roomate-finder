import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";
import { Home } from "./components/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
