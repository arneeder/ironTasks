import './index.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MyTasks = () => {
    
    const storedToken = localStorage.getItem('authToken')
    const [myTasks, setMyTasks] = useState([])
    
    const getAllTasks = () => {
        axios.get(`/api/tasks/`, { headers: { Authorization: `Bearer ${storedToken}` } } )
            .then( myTasks => setMyTasks( () => myTasks.data ) )
            .catch( err => console.log(err) )
    }
    
    useEffect(() => {
        getAllTasks()
    
    }, [])
    
    
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