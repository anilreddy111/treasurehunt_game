import React from 'react'
import './Won.css'
import WonImg from '../images/Treasure.gif'
import { useNavigate } from 'react-router-dom'

function Won() {

    const navigate = useNavigate()

    return (
        <div className='won'>
            <div>
            <h1 className='text-center fw-bold text-success'>You won!</h1>
                <img className='wonImg' src={WonImg} alt="" />
                <h5 className='text-center'>Escape with the treasure!</h5>
                <button onClick={()=>{
                    localStorage.removeItem("round")
                    navigate("/home")
                }} className='btn btn-primary mx-auto'>Restart</button>
            </div>
        </div>
    )
}

export default Won
