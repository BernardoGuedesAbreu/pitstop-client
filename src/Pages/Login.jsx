import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import '../dashboard.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {storeToken, authenticateUser} = useContext(AuthContext)

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    axios
      .post(`${import.meta.env.VITE_MONGO_URL}/api/login`, body)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      })
      .catch((err) => {
        setError(err.response);
      });
  };


  return (
    <div className="auth">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <button className="auth-button" type="submit">Login</button>
        <p>Dont have an account yet?</p>
          <Link to={'/signup'} className="no-auth">
            Sign Up here
          </Link>
      </form>
    </div>
  );
};

export default Login;
