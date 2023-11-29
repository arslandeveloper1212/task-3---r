import React, { useState } from "react";

import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import Nav from "./Nav";
const Login = () => {
  const navigate = useNavigate(); // Use useNavigate

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
   
  });

 
  const HandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setState({ ...state, [name]: value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log("done");
    const { username, email, password } = state;
    const result = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
  
    const datahit = await result.json();
    console.log(datahit.data);
    if (datahit.status === 422 || !datahit) {
      console.log("err");
      alert("Invalid Credentials");
    } else {
      alert("Login Successfully");
      localStorage.setItem("userprofiledata",JSON.stringify(datahit))
      setState({ ...state, username: "", email: "", password: "" });
  
      // Assuming you have 'useNavigate' properly imported at the beginning of your component
      navigate("/profile");
    }
  };

  return (
    <div>
      <Nav />

      <div
        style={{
          backgroundColor: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: "lightgrey",
            padding: "60px",
            borderRadius: "20px",
          }}
        >
          <h2
            className="blue_violet"
            style={{ textAlign: "center", fontSize: "38px" }}
          >
            Login
          </h2>
          <form method="POST" onSubmit={HandleSubmit}>
          <input
            type="text"
            name= "username"
            className="form-control"
            placeholder="Username"
            value={setState.username}
            onChange={HandleChange}
          />
          <input
            type="email"
            name= "email"
            className="form-control my-3"
            placeholder="email"
            value={setState.email}
            onChange={HandleChange}
          />
          <input
            type="password"
            name= "password"
            className="form-control my-3"
            placeholder="Password"
            value={setState.password}
            onChange={HandleChange}
          />
          
          <button className="btn_color">
            Login
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
