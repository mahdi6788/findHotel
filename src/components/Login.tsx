import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { user, login, isAuthenticated } = useAuth();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(email && password) login(email, password)
    };

    useEffect(()=>{
        if (isAuthenticated) navigate("/" , {replace: true})
    },[isAuthenticated, navigate])
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="formControl">
          <label htmlFor="Password">Password</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="button">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
