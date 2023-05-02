import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './login.css'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [name,setName] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate()

    const submit = async () =>{
        console.log({
            name: name,
            password: password
        })
        const res = await axios.post("/users/login",{
            username: name,
            password: password
        })

        if(!res.data.message){
            localStorage.setItem("token",res.data)
            navigate("/home")
        }
        else alert(res.data.message)
    }

    useEffect(()=>{
        if(localStorage.getItem("token")) navigate("/home")
    },[])

    return (
        <div className='login'>
            <div className="login-page">
                <h2 className='text-center fw-bolder text-white'>Login to enter game</h2>
                <div className="form">
                    <div className="login-form">
                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="username" />
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password" />
                        <button onClick={submit}>login</button>
                        <p className="message">Not registered? <a href="signup">Create an account</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
