import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

function Home() {

    const [start, setStart] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("round") || localStorage.getItem("round") == "1") setStart(true)
        else setStart(false)


        if (!localStorage.getItem("token")) navigate("/login")
    }, [])

    return (
        <div className='homeOut'>
            <div className='logoutDiv'>
                <button className='btn btn-primary ms-auto m-3' onClick={() => {
                    localStorage.clear()
                    navigate("/login")
                }}>
                    Logout
                </button>
            </div>
            <div className='home'>
                <div>
                    <h1 className='text-center text-white'>Hello!</h1>
                    <button onClick={() => navigate("/first")} className='btn btn-primary mx-3'>Start game</button>
                    {
                        !start && <button onClick={() => navigate("/second")} className='btn btn-primary mx-3'>Continue</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
