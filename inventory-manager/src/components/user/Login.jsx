import React, { useState } from "react";

export const Login = (props) => {
  const [pid, setPid] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(pid);
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="pid">PID</label>
        <input
          value={pid}
          onChange={(e) => setPid(e.target.value)}
          type="pid"
          placeholder="Your PID"
          id="pid"
          name="pid"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
