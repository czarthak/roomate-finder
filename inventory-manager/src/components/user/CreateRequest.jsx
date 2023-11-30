import React, { useState } from "react";
import Axios from "axios";

export const CreateRequest = (props) => {
  const [reqId, setReqId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [orgId, setOrgId] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/request/add", {
      userEmail: userEmail,
      reqId: reqId,
      desc: desc,
      orgId: orgId,
      status: status,
      type: type,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="creation-form-container">
      <h2>Create Request</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <label htmlFor="reqId">Request ID</label>
        <input
          value={reqId}
          onChange={(e) => setReqId(e.target.value)}
          name="reqId"
          id="reqId"
          placeholder="Request ID"
        />

        <label htmlFor="userEmail">User Email</label>
        <input
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          name="userEmail"
          id="userEmail"
          placeholder="user_pid@vt.edu"
          type="email"
        />

        {/* <label htmlFor="status">Status</label>
        <input
          value={status}
          // onChange={(e) => setStatus(e.target.value)}
          onChange={(e) => PENDING}
          name="status"
          id="status"
          placeholder="STATUS"
        />  */}

        <label htmlFor="type">Type</label>
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            name="type"
            id="type"
            placeholder="JOIN/ITEM"
          />

        <label htmlFor="desc">Description</label>
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          id="desc"
          name="desc"
          placeholder="..."
        />

        <label htmlFor="orgId">Organization ID</label>
        <input
          value={orgId}
          onChange={(e) => setOrgId(e.target.value)}
          id="orgId"
          name="orgId"
          placeholder="Organization ID"
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateRequest;

