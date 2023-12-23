import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import "./RegisterPage.css"

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (

    <div className="pageparent">
      <form onSubmit={handleSubmit} className="registerform">
    <div><h2 className="registertitle registerchild">Register new user:</h2></div>
        <label className="registerchild">
          Username:{" "}
          <input
            className="registerinput"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label className="registerchild">
          First Name:{" "}
          <input 
            className="registerinput"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label className="registerchild">
          Last Name:{" "}
          <input
            className="registerinput"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label className="registerchild">
          Email:{" "}
          <input
            className="registerinput"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label className="registerchild">
          Password:{" "}
          <input
            className="registerinput"
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <p style={{ fontSize: "12px" }}>
          NOTE: Make this an uncommon password with characters, numbers, and special characters!
        </p>
        <button className="registerchild registerbutton">Register!</button>
      </form>
    </div>
  );
};

export default RegisterPage;
