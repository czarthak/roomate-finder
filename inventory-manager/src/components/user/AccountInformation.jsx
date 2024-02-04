import React, { useState, useEffect } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import "./AccountInformation.css"; // Import your external CSS file
import Places from "../map/places";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Link } from "react-router-dom";



const AccountInformation = ({ token }) => {
  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    password: "",
    phoneNumber: "",
    email: "",
    year: "",
    major: "",
    bio: "",
    existingApart: "",
    preferApart: "",
    budget: "",
    personalTrait: "",
  });


 



  const [initials, setInitials] = useState("");

  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || '');

  useEffect(() => {
    // When userInfo is fetched or updated, update the initials
    if (userInfo.fname && userInfo.lname) {
      const initials = `${userInfo.fname[0]}${userInfo.lname[0]}`.toUpperCase();
      setInitials(initials);
    }
  }, [userInfo]);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Replace with how you get the user's email

    if (file) {
      const formData = new FormData();
      formData.append('imageFile', file);

      // Include the email in the URL as a query parameter
      const url = `http://localhost:8080/user/img?token=${encodeURIComponent(token.jwt)}`;

      Axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          console.log('Image uploaded successfully:', response.data);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    }
  };




  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    // Fetch user information when the component mounts
    getUserInfo();
  }, []); // Empty dependency array ensures the effect runs once

  const getUserInfo = async () => {
    try {
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
        ...userInfo,
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
      <div className="profile-side">
        {profilePic ? (
          <img src={profilePic} alt="Profile" className="profile-picture" />
        ) : (
          <div className="initials-circle">{/* User initials here */}</div>
        )}
        <input type="file" onChange={handleImageUpload} />
      </div>
      <h2>Profile Information</h2>
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

        {/* Additional fields for user information */}
        <label htmlFor="year">Year </label>
        <select
          id="year"
          name="year"
          value={userInfo.year}
          onChange={handleChange}
        >
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
          <option value="Grad">Grad</option>
        </select>


        <label htmlFor="major">Major</label>
        <input
          type="text"
          id="major"
          name="major"
          value={userInfo.major}
          onChange={handleChange}
        />

        <label htmlFor="bio">Biography (A little about yourself)</label>
        <textarea
          id="bio"
          name="bio"
          value={userInfo.bio}
          onChange={handleChange}
        />

        <label htmlFor="existingApart">Existing Apartment (Leave empty if not applicable)</label>
        <input
          type="text"
          id="existingApart"
          name="existingApart"
          value={userInfo.existingApart}
          onChange={handleChange}
        />

        <label htmlFor="preferApart">Preferred Apartment</label>
        <input
          type="text"
          id="preferApart"
          name="preferApart"
          value={userInfo.preferApart}
          onChange={handleChange}
        />

        <label htmlFor="budget">Budget (Per Month)</label>
        <input
          type="text"
          id="budget"
          name="budget"
          value={userInfo.budget}
          onChange={handleChange}
        />

        <p></p>

        <div className="home-container">
        
        <h2>Discover Your Roomie Match</h2>
        <p>
          Unlock a more personalized roommate matching experience by sharing your personality type.
        </p>
        <p>
          Knowing your personality type helps us find the roommate who complements you best. Enter your 16-personality type (e.g., INFP, ESTJ, etc.) below:
        </p>
        
        <label htmlFor="personalTrait">Personality Test Result:</label>
        <input
          type="text"
          id="personalTrait"
          name="personalTrait"
          value={userInfo.personalTrait}
          onChange={handleChange}
        />
        
        <p>
        Not sure of your personality type? No problem! Take our custom Test
        <Link to="/personality-test" className="personality-test-button">
        <b>Start Now</b>  
        </Link>
        
</p>
        
       
        
        
      </div>


        <button type="button" onClick={handleUpdate}>
          Update Information
        </button>
      </div>
      <label> Add some places you'd want to live at here </label>
      <Places />
    </div>
  );
};

AccountInformation.propTypes = {
  token: PropTypes.shape({
    jwt: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccountInformation;
