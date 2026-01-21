import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../apis/auth";
import { useAuth } from "../auth/AuthContext";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await loginApi(username, password);

      // role comes from backend later (JWT/session)
      login({ username, role: "ADMIN" });

      navigate("/admin/dashboard");
    } catch {
      alert("Invalid admin credentials");
    }
  };

  return (
    <>
      <h2>Admin Login</h2>
      <input onChange={e => setUsername(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>

      <p>
        Not an Admin? Click here to 
           <button onClick={() => navigate("/user/login")}>
             Login as User
           </button>
      </p>
    </>
  );
}
