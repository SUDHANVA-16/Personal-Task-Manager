import React, { useState } from 'react'
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login(props) {
  const [email, setEmail] = useState(""); //state variable
  const [password, setPassword] = useState(""); //state variable

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    };
    try {
      const response = await axios.post("http://localhost:5000/user/login", data);
      if (response.data.status === "error") {
        alert(response.data.message);
        return;
      } else {
        //login successful
        alert(response.data.message)
        const user = response.data.data;
        localStorage.setItem("user", JSON.stringify(user));
        props.setCurrentUser(user)
        setTimeout(() => {
          navigate("/tasks")
        }, 500);
      }

      //to reset form once user is logged in
      setEmail("");
      setPassword("");

    } catch (error) {
      alert(error)
    }
    console.log(data);
  }
  return (
    <div className='log-cont'>
      <h4>Login Form</h4>
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <label>Email : </label>
          <input type="email" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='form-control'>
          <label>Password : </label>
          <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className='log-btn'>Login</button>
      </form>
    </div>
  )
}

export default Login