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
import CreateOrganization from "./components/user/CreateOrganization";
import CreateRequest from "./components/user/CreateRequest";

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
        <Route path="/createorganization" element={<CreateOrganization />} />
        <Route path="/createrequest" element={<CreateRequest />} />
      </Routes>
    </div>
  );
}

export default App;
