import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const body = {
      email,name,
      password,
    };
    axios
      .post(`https://friendly-otter-eed6d1.netlify.app/api/signup`, body)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response);
      });
  };

  return (
    <div className="auth">
      <h2>Signup</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignupSubmit}>
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
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleName}
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
        <button className="auth-button" type="submit">Sign up</button>
        <p>Already have an account?</p>
        <Link to={"/login"} className="no-auth">Login here</Link>
      </form>
    </div>
  );
};

export default Signup;
