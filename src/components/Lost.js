import React from 'react'
import { useNavigate } from 'react-router-dom'

function Lost() {

    const navigate = useNavigate()

    return (
        <div className='home fw-bolder'>
            <div>
                <p className='text-center'>{"You lost :("}</p>
                <button onClick={()=>{
                    localStorage.removeItem("round")
                    navigate("/first")
                }} className='btn btn-primary'>Try again</button>
            </div>
        </div>
    )
}

export default Lost
