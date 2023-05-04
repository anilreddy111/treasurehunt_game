import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Admindashboard() {
    let [leader, setLeader] = useState([{}])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('/users/getleader')
            .then(res => {
                // console.log(res)
                // setUsersScore(res.data.payload)
                setLeader([...res.data.payload.sort((a, b) => {
                    return (a['level1'] + a['level2']) - (b['level1'] + b['level2'])
                })]);
                // setLeader([res.data.payload])
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className='logoutDiv'>
                <button className='btn btn-primary ms-auto m-3' onClick={() => {
                    localStorage.clear()
                    navigate("/login")
                }}>
                    Logout
                </button>
            </div>

            <p className="lead display-3 text-center m-5">Leader Board</p>
            <table className="table w-75 mx-auto mt-5 table-responsive{-sm|-md|-lg|-xl}">
                <thead className="thead">
                    <th>
                        rank
                    </th>
                    <th>
                        email
                    </th>
                    <th>
                        Hints taken in Finding the treasure
                    </th>
                    <th>
                        Hints taken to solve the riddle
                    </th>
                </thead>
                <tbody className="tbody">
                    {
                        leader.map((element, index) => <tr key={element.username}>
                            <td>{index + 1}</td>
                            <td>{element.email}</td>
                            <td>{element.level1}</td>
                            <td>{element.level2}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Admindashboard
