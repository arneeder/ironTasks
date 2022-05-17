import './index.css'
import axios from 'axios'
import React, { useState } from 'react'
import TasksAllProjects from '../../components/TasksAllProjects/TasksAllProjects'

const ProjectsDetail = () => {
  
    const storedToken = localStorage.getItem('authToken')

    const [tasks, setTasks] = useState([])

    const getAllTasks = () => {
        axios.get('/api/tasks/', { headers: { Authorization: `Bearer ${storedToken}` } } )
            .then( allTasks => {
                setTasks(() => allTasks)
            })
            .catch(error => console.log(error))
    }
  
    return (
        <>
            <TasksAllProjects getAllTasks={getAllTasks} tasks={tasks} />
        </>
  )
}

export default ProjectsDetail