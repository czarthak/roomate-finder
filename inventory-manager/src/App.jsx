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
import AccountInformation from "./components/user/AccountInformation";
import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
  // const [token, setToken] = useState();
  const { token, setToken } = useToken();
  // const token = getToken();
  // if (!token) 
  // {
  //   return <Login setToken={setToken}/>
  // }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
        <Route path="/register" element={<Register />} />
        <Route path='/accountinfo' element={<ProtectedRoute token={token}> <AccountInformation token={token}/> </ProtectedRoute>}>
        </Route>
        {/* <Route path="/deleteUser" element={<DeleteUser token={token}/>} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/accountinfo" element={<AccountInformation token={token}/> } /> */}
      </Routes>
    </div>
  );
}

export default App;
