import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Navigate({path}) {

    const navigate = useNavigate();

    useEffect(()=>{
        navigate("/"+path)    
    },[])
    return <></>

}

export default Navigate
