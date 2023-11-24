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
import { useState } from "react";
import useToken from "./components/useToken";

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken.data));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   if (!tokenString)
//     return null;
//   const userToken = JSON.parse(tokenString);
//   if (userToken.user != null)
//     return tokenString;
//   return null;
// }


function App() {
  // const [token, setToken] = useState();
  const { token, setToken } = useToken();
  // const token = getToken();
  if (!token) 
  {
    return <Login setToken={setToken}/>
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/deleteUser" element={<DeleteUser />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
      </Routes>
    </div>
  );
}

export default App;
