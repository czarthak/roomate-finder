import React, { useState } from "react";
import Axios from "axios";

export const CreateOrganization = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [membercount, setMembercount] = useState("");

  // const Categories = {
  //   ACADEMIC: "academic",
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(owner);
    console.log(description);
    Axios.post("http://localhost:8080/organization/add", {
      email: email,
      name: name,
      owner: owner,
      description: description,
      category: category,
      membercount: membercount,
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

        <label htmlFor="owner">Owner Email</label>
        <input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          name="owner"
          id="owner"
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

        <label htmlFor="description">Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          name="description"
          placeholder="..."
        />

        <label htmlFor="category">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="category"
          name="category"
          placeholder="Category"
        />

        <label htmlFor="membercount">Member Count</label>
        <input
          value={membercount}
          onChange={(e) => setMembercount(parseInt(e.target.value))}
          id="membercount"
          name="membercount"
          placeholder="Member Count"
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateOrganization;

