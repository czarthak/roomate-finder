import React, { useState, useEffect } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import "./AccountInformation.css"; // Import your external CSS file

const AccountInformation = ({ token }) => {
  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    password: "",
    phoneNumber: "",
    email: "",
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    // Fetch user information when the component mounts
    getUserInfo();
  }, []); // Empty dependency array ensures the effect runs once

  const getUserInfo = async () => {
    try {
      // console.log(token);
      const response = await Axios.post("http://localhost:8080/user/user", {
        jwt: token.jwt,
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await Axios.put("http://localhost:8080/user/update", {
        fname: userInfo.fname,
        lname: userInfo.lname,
        password: userInfo.password,
        phoneNumber: userInfo.phoneNumber,
        email: userInfo.email,
        jwt: token.jwt,
      });
      setUserInfo(response.data);
      setUpdateSuccess(true);
      console.log("User information updated successfully");
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  return (
    <div className="account-info-container">
      <h2>Account Information</h2>
      {updateSuccess && (
        <p className="success-message">Information updated successfully!</p>
      )}
      <div className="info-form">
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={userInfo.fname}
          onChange={handleChange}
        />

        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          id="lname"
          name="lname"
          value={userInfo.lname}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={userInfo.phoneNumber || ""}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
        />

        <button type="button" onClick={handleUpdate}>
          Update Information
        </button>
      </div>
    </div>
  );
};

AccountInformation.propTypes = {
  token: PropTypes.shape({
    jwt: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccountInformation;
