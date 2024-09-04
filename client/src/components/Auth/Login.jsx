import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { Context } from "../../utils/context";

function Login() {
  const { farmer, setFarmer } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5001/api/user/login", { email, password });
      setFarmer(data);
      alert("Login successful");
      <Navigate to={farmer ? "/" : "/login"} />;
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <>
      <div className="container my-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Login</div>
              <div className="card-body">
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="abc@gmail.com"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="*****"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                  <button type="submit" className="gradient-button">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
