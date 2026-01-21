import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUserApi } from "../apis/auth";

export default function UserRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!username || !password) {
      alert("Username and password required");
      return;
    }

    try {
      await registerUserApi({ username, password });
      alert("User registered successfully");
      navigate("/user/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <>
      <h2>User Register</h2>

      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={submit}>Register</button>

      <p>
        Already have an account?
        <Link to="/user/login"> Login</Link>
      </p>
    </>
  );
}
