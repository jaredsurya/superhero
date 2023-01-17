import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom";

// toggles to show login when showLogin reads "true"
function LoginForm ({onLogin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  
  function loginSubmit(e){
    e.preventDefault()
    const user = {username: username, password: password}
    fetch("/login", {
        method: "POST", 
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })
    .then((r) => {
        if (r.ok) {
            r.json().then((user) => onLogin(user));
            navigate("/")
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
    })
  }
  console.log(username, password)
  return (
    <div>
      <h3>Please log in:</h3>
      <form onSubmit={loginSubmit}>
        <label for="username">Username: </label>
        <input 
          type="text" 
          id="username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br/>
        <label for="password">Password: </label>
        <input 
          type="password" 
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <input type="submit" value="Submit" />
        {errors.map((err) => (<p key={err}>{err}</p>))}
      </form>
    </div>
)}

export default LoginForm