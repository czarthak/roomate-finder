import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import {
  DeleteUser,
  Login,
  Register,
  UpdatePassword,
  CreateOrganization,
  CreateRequest,
  ListAllOrganizations,
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
        <Route path="/createorganization" element={<CreateOrganization />} />
        <Route path="/createrequest" element={<CreateRequest />} />
        <Route path="/listallorganizations" element={<ListAllOrganizations />} />
      </Routes>
    </div>
  );
}

export default App;
