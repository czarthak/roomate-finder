import React, { useState } from "react";
import Axios from "axios";

export const Register = (props) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:8080/user/add", {
      email: email,
      lname: lname,
      fname: fname,
      phoneNumber: phoneNumber,
      password: pass,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="fname">First name</label>
        <input
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          name="fname"
          id="fname"
          placeholder="First Name"
        />

        <label htmlFor="lname">Last name</label>
        <input
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          name="lname"
          id="lname"
          placeholder="Last Name"
        />

        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
          placeholder="pid@vt.edu"
          type="email"
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          id="phoneNumber"
          name="phoneNumber"
          placeholder="###-###-####"
        />

        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          id="password"
          name="password"
          placeholder="********"
          type="password"
        />

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Register;
