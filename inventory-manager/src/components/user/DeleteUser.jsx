import React, { useState } from "react";
import Axios from "axios";

export const DeleteUser = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.delete("http://localhost:8080/user/delete", {
      headers: {},
      data: {
        email: email
      }
    }).then((response) => {
      console.log(response);
    });
    };

  //   Axios.delete("http://localhost:8080/user/delete", {
  //     email: email,
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

  return (
    <div className="auth-form-container">
      <h2>Delete User</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="User Email"
          id="email"
          name="email"
        />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};
