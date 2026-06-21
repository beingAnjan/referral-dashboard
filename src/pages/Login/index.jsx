import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";

import "./index.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken !== undefined) {
        return <Navigate to="/" replace />;
    }

    const loginApiUrl ="https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin";

    const onSubmitForm = async (event) => {
        event.preventDefault();

        setErrorMsg("");

        const userDetails = {
            email,
            password,
        };

        try {
            const response = await axios.post(loginApiUrl, userDetails);

            const jwtToken = response.data.data.token;

            Cookies.set("jwt_token", jwtToken);

            navigate("/");
        } catch (error) {
            console.log(error.response?.data?.message);

            setErrorMsg("Invalid email or password");
        }

    };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logo">Go Business</h1>

        <p className="subtitle">
          Sign in to open your referral dashboard.
        </p>

        <form className="login-form" onSubmit={onSubmitForm}>
          <div className="input-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMsg("");
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrorMsg("");
              }}
            />

            {errorMsg && <p className="error-text">{errorMsg}</p>}
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;