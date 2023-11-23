import React, { useState } from "react";
import Axios from "axios";

export const CreateOrganization = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [desc, setDesc] = useState("");
  // const [orgId, setOrgId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/organization/add", {
      email: email,
      name: name,
      ownerEmail: ownerEmail,
      desc: desc,
      // orgId: orgId,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="creation-form-container">
      <h2>Create Organization</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
          placeholder="Name"
        />

        <label htmlFor="ownerEmail">Owner Email</label>
        <input
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
          name="ownerEmail"
          id="ownerEmail"
          placeholder="owner_pid@vt.edu"
          type="email"
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

        <label htmlFor="desc">Description</label>
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          id="desc"
          name="desc"
          placeholder="..."
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateOrganization;

