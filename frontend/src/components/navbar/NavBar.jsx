import React from 'react'
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

function NavBar(props) {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    }

    const handleLogout = () => {
      localStorage.setItem("user", null);
      setTimeout(() => {
        navigate("/");
        props.setCurrentUser(null);
      }, 500);
    };

    
  return (
    <div className="navbar-container">
         <div className="navbar-task">
            <h3>Personal Task Manager</h3>
        </div>
        <div className="navbar-actions">
          {props.currentUser ? (
            <>
            <button onClick={() => handleNavigate("/tasks")}>All Tasks</button>
            <button onClick={() => handleLogout()}>Logout</button>
          </>
          ): (
            <>
            <button onClick={() => handleNavigate("/")}>Login</button>
            <button onClick={() => handleNavigate("/Register")}>Register</button>
            </>
          )}
        </div>
    </div>
  )
}
export default NavBar