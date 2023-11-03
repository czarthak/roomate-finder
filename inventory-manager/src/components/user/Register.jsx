import React, { useState } from "react";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [pid, setPid] = useState("");
  const [pass, setPass] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
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
          value={pid}
          onChange={(e) => setPid(e.target.value)}
          id="phoneNumber"
          name="phoneNumber"
          placeholder="###-###-####"
        />

        <label htmlFor="pid">PID</label>
        <input
          value={pid}
          onChange={(e) => setPid(e.target.value)}
          name="pid"
          id="pid"
          placeholder="Your PID"
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
