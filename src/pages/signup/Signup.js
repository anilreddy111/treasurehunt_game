import React, { useState } from 'react'
import './signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [type, setType] = useState("user")

    const navigate = useNavigate()
    const handleChange = (event) => {
        setType(event.target.value)
    }

    const submit = async () => {
        console.log({
            name: name,
            password: password,
            email: email,
            type: type
        })

        const res = await axios.post("/users/createuser", {
            username: name,
            password: password,
            email: email,
            type: type
        })

        alert(res.data.message)
        if (res.data.message == "User added succesfully") navigate("/login")

    }

    return (
        <div>

            <div>
                <div className="sign-form" id="sign-form" autoComplete="on">
                    <h1 className="form-title">Sign Up</h1>
                    <br />

                    <select name="type" id="type" className='mb-2 d-block mx-auto' value={type} onChange={handleChange} >
                        <option defaultChecked disabled>Select</option>
                        <option value="user">User</option>
                    </select>

                    <br />

                    <label htmlFor="username">Name<span className="star-required">*</span></label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="username" id="username" placeholder="Name" autoFocus required />

                    <label htmlFor="email">Email<span className="star-required">*</span></label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="mail@website.com" required />

                    <label htmlFor="password">Password<span className="star-required">*</span></label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Min. 8 character" required />

                    <br />

                    <input type="checkbox" name="terms-agree" id="terms-agree" required />
                    <p className="sentence-agree">I agree to the <a href="">Terms & Conditions</a></p>

                    <input onClick={submit} type="button" value="Sign Up" id="submit" />

                    <p className="have-account-line">Already have an Account? <a href="login">Login</a></p>

                </div>
            </div>
        </div>
    )
}

export default Signup
