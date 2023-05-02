import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Map.css'

function Map() {

    const navigate = useNavigate()

    const answers = [
        {
            name: "lighthouse",
            ox: 125,
            oy: 29,
            hints: ["You hear a loud horn or siren coming from the area", "Watch for a flashing light", "Check for a distinct color scheme", "Look for surrounding buildings", "Listen for foghorns"]
        },
        {
            name: "Island tree",
            ox: 292,
            oy: 177,
            hints: ["Check for a single tree standing on the land", "Observe the shape of the land, specifically for a small, circular shape", "Look for small land surrounded by water", "Look for land surrounded by water", "water around you"]
        },
        {
            name: "skull",
            ox: 47,
            oy: 64,
            hints: ["check for warning sign", "similar to dead pool", "Red Zone", "poision", "find cross symbol"]
        }
    ]

    const [choosable, setChoosable] = useState(true)
    const [status, setStatus] = useState()
    const [cnt, setCnt] = useState(0)

    const [target, setTarget] = useState()

    const [started,setStarted] = useState(true)

    useEffect(() => {
        setTimeout(()=>setStarted(false),2000)
        setTarget(answers[Math.floor(Math.random() * 3)])
    }, [])

    const clickMap = (e) => {
        if (choosable) {
            setCnt(cnt + 1)

            const x = e.nativeEvent.offsetX - target.ox
            const y = e.nativeEvent.offsetY - target.oy
            console.log(Math.sqrt(x * x + y * y) <= 24)
            if (Math.sqrt(x * x + y * y) <= 24) {
                setStatus(true)
                setChoosable(false)
                localStorage.setItem("round","2")
            }

            if (cnt == 4) {
                setChoosable(false)
                setStatus(false)
            }
        }
    }

    if (!choosable) {
        setTimeout(() => {
            if (status) navigate("/second")
            else navigate("/lost")
        }, 2000)
    }

    return (
        started ? 
        <div className='instructions display-6 fw-bolder'>
            Find where treasure is based on given hints
        </div>:
        <div className='map'>
            {/* <p>{target?.name}</p> */}
            <br/>
            {
                !choosable && status && 
                <div>
                    <p className='text-center fw-bold display-6 text-success'>You found the treasure!</p>
                    <p className='text-center fw-bold h3 text-success'>You are redirected to the final level of the game to open box...</p>
                </div>
            }
            {
                !choosable && !status && <p className='text-center fw-bold display-6 text-danger'>Lost</p>
            }
            {
                choosable && cnt < 5 &&
                <p className='text-center fw-bold display-6'>hint: {target?.hints[cnt]}</p>
            }
            <h1 id="heading">Find the buried treasure!</h1>
            <img onClick={clickMap} id="map" width="500" height="500" src="http://www.foundmyself.com/gallery/albums/userpics/26339/treasure_map.jpg" />
            <p id="distance"></p>
            <p id="clicks-remaining"></p>
        </div>
    )
}

export default Map
