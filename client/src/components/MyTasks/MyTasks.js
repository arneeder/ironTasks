import './index.css'
import React, { useState } from 'react'
import axios from 'axios'

const MyTasks = () => {
    
    const storedToken = localStorage.getItem('authToken')
    const [myTasks, setMyTasks] = useState([])
    
    axios.get(`/api/tasks/`, { headers: { Authorization: `Bearer ${storedToken}` } } )
        .then( myTasks => setMyTasks( () => myTasks.data ) )
        .catch( err => console.log(err) )
    
    return (
        <div>
            <h2>My Tasks</h2>
            <div className='task-list-container'>
            {
                myTasks.map( task => (
                    <div className='one-task-overview'>
                        <p><strong>{task.name}</strong></p>
                        <p>{task.statusCluster}</p>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default MyTasks