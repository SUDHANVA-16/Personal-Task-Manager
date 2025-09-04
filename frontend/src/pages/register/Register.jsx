import React, { useState } from 'react'
import './Register.css';
import axios from 'axios';

function Register() {
    const [name, setName] = useState(""); //state variable
    const [email, setEmail] = useState(""); //state variable
    const [phone, setPhone] = useState(""); //state variable
    const [password, setPassword] = useState(""); //state variable
    const [ConfirmPassword, setConfirmPassword] = useState(""); //state variable
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== ConfirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const data = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };
        try {
            const response = await axios.post("http://localhost:5000/user", data);
            alert(response.data);

            //to reset form once user is created
            setName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setConfirmPassword("")
        
        } catch (error) {
            alert(error)
        }
        console.log(data);
    }
    return (
        <div className='reg-cont'>
            <h4>Registration Form</h4>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label>Name : </label>
                    <input type="text" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='form-control'>
                    <label>Phone Number : </label>
                    <input type="telephone" placeholder='Enter Your Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className='form-control'>
                    <label>Email : </label>
                    <input type="email" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='form-control'>
                    <label>Password : </label>
                    <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='form-control'>
                    <label>Confirm Password : </label>
                    <input type="password" placeholder='Confirm Password' value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button className='reg-button'>Register</button>
            </form>
        </div>
    )
}

export default Register