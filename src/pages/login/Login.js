import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './login.css'
import { useNavigate } from 'react-router-dom'


function Login() {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState("")
    const navigate = useNavigate()
    
    const handleChange = (event) => {
        setType(event.target.value)
    }

    const submit = async () => {
        console.log({
            email: name,
            password: password,
            type:type
        })
        const res = await axios.post("/users/login", {
            email: name,
            password: password,
            type : type
        })

        if (!res.data.message) {
            localStorage.setItem("token", res.data)
            localStorage.setItem("email", name)
            if(type === "user") navigate("/home")
            else navigate("/admin")
        }

        else alert(res.data.message)
    }

    useEffect(() => {
        if (localStorage.getItem("token")) navigate("/home")
    }, [])

    return (
        <div className='login'>
            <div className="login-page">
                <h2 className='text-center fw-bolder text-white'>Login to enter game</h2>
                <div className="form">
                    <div className="login-form">
                        <select name="type" id="type" className='mb-2 d-block mx-auto' value={type} onChange={handleChange} >
                            <option>Select</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>

                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="email" />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
                        <button onClick={submit}>login</button>
                        <p className="message">Not registered? <a href="signup">Create an account</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
