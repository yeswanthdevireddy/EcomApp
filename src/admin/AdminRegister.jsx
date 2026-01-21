import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerAdminApi } from "../apis/auth";

export default function AdminRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!username || !password) {
      alert("Username and password required");
      return;
    }

    try {
      await registerAdminApi({ username, password });
      alert("Admin registered successfully");
      navigate("/admin/login");
    } catch {
      alert("Admin registration failed");
    }
  };

  return (
    <>
      <h2>Admin Register</h2>

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
        Already an admin?
        <Link to="/admin/login"> Login</Link>
      </p>
    </>
  );
}
