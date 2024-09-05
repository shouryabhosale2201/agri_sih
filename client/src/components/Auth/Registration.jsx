import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/farmer/register", {
        name,
        email,
        password,
        phone,
      });
      alert("registration successful");
      navigate("/");
    } catch (error) {
      alert("registration failed");
    }
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
  };

  return (
    <>
      <div className="my-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Sign In</div>
              <div className="card-body">
                <form onSubmit={registerUser}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="form-control"
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="form-control"
                      required
                      placeholder="abc@gmail.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="form-control"
                      required
                      placeholder="*****"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="form-control"
                      required
                      placeholder="9999999999"
                    />
                  </div>
                  <button type="submit" className="gradient-button">
                    Sign In
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

export default Signup;
