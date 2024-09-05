import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Context } from "../../utils/context";

function Login() {
  const { handleLogin } = useContext(Context);  // Get handleLogin from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleLogin(email, password);  // Call handleLogin from context
      alert("Login successful");
      navigate("/");  // Redirect to the home page after successful login
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
