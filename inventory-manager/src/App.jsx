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
import { useState } from "react";
import useToken from "./components/useToken";
import AccountInformation from "./components/user/AccountInformation";
import PrivateRoutes from "./routes/PrivateRoutes";
import MyOrganizations from "./components/myorg/MyOrganizations";
import OrganizationDetails from "./components/myorg/OrganizationDetails";
import NotFound from "./components/error/NotFound";
import OrganizationRoster from "./components/myorg/roster/OrganizationRoster";

function App() {
  // const [token, setToken] = useState();
  const { token, setToken } = useToken();
  // const token = getToken();
  // if (!token)
  // {
  //   return <Login setToken={setToken}/>
  // }

  console.log(token);
  return (
    <div className="App">
      <Navbar token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes token={token} />}>
          <Route
            path="/accountinfo"
            element={<AccountInformation token={token} />}
          />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route path="/createorganization" element={<CreateOrganization />} />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route path="/createrequest" element={<CreateRequest />} />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route path="/myorganizations" element={<MyOrganizations token={token}/>} />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route path="/organizations/:orgId" element={<OrganizationDetails token={token}/> } />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route path="/organizations/:orgId/members" element={<OrganizationRoster token={token}/> } />
        </Route>
        <Route path='*' element={<NotFound />}/>
        <Route path='/404' element={<NotFound />}/>
        {/*<Route path="/organizations/:orgId" element={<OrganizationDetails token={token}/>}>*/}
        {/*</Route>*/}
        <Route
          path="/listallorganizations"
          element={<ListAllOrganizations />}
        />
      </Routes>
    </div>
  );
}

export default App;
