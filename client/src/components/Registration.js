import React, { useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import icons from "../images/registration_image.jpeg";
import "../App.css";

const Registration = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone_no: "",
    password: "",
    cpassword: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleClear = () => {
    setUser({
      name: "",email: "",phone_no: "",password: "",cpassword: ""
    });
  };

  const PostData = async (e) => {
    e.preventDefault();
  
    const { name, email, phone_no, password, cpassword } = user;
  
    // Validation checks
    if (name.length < 4) {
      window.alert("Name should be at least 4 characters!");
      return;
    }
  
    if (email.length < 10) {
      window.alert("Email should be more than 10 characters!");
      return;
    }

    const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      window.alert("Please enter a valid Gmail address!");
      return;
    }

    if (!/^\d{10}$/.test(phone_no)) {
      window.alert("Phone number should be 10 digits!");
      return;
    }
  
    if (password.length < 8 || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      window.alert("Password should be at least 8 characters and include a number and a symbol!");
      return;
    }
  
    if (password !== cpassword) {
      window.alert("Password and Confirm Password do not match!");
      return;
    }
  
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone_no: phone_no,
        password: password,
        cpassword: cpassword,
      }),
    });
  
    const data = await res.json();
  
    if (data.error) {
      // Check for the error field in the response data
      window.alert(data.error);
      console.log("Registration failed");
    } else {
      window.alert("Registration successfully !!!");
      console.log("Registration successfully !!!");
  
      navigate("/login");
    }
  };

  return (
    <>
      <section className="registration">
        <div className="container-fluid mt-5">
          <div className="row d-flex align-items-center">
            <div className="col-md-6">
              <div
                className="registration-image"
                style={{
                  position: "relative",
                  border: "2px solid white",
                  padding: "20px",
                }}
              >
                <figure style={{ margin: 0 }}>
                  <img
                    src={icons}
                    alt="registration"
                    className="img-fluid"
                    style={{ width: "90%", height: "auto" }}
                  />
                </figure>
                <p
                  className="mt-3"
                  style={{
                    position: "absolute",
                    bottom: -30,
                    right: 0,
                    textAlign: "right",
                    display: "inline-block",
                  }}
                >
                  Already registered?{" "}
                  <NavLink to="/login" className="registration-image-link">
                    I am already registered!
                  </NavLink>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="registration-form"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "20px",
                }}
              >
                <h2 className="mb-4">User Registration</h2>
                <form method="POST">
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      autoComplete="off"
                      value={user.name}
                      onChange={handleInputs}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your email"
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInputs}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone_no"
                      placeholder="Your phone number"
                      autoComplete="off"
                      value={user.phone_no}
                      onChange={handleInputs}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Your Password"
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInputs}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="cpassword"
                      placeholder="Confirm Password"
                      autoComplete="off"
                      value={user.cpassword}
                      onChange={handleInputs}
                      className="form-control"
                      required
                    />
                  </div>
                  <>
                    <button
                      type="submit"
                      className="btn btn-primary mr-2"
                      style={{ color: "black", marginTop: "10px", marginRight: "5px" }}
                      onClick={PostData}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleClear}
                      style={{ color: "black", marginTop: "10px" }}
                    >
                      Clear
                    </button>
                  </>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Registration;
