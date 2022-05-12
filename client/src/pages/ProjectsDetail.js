import axios from 'axios'
import React, { useState } from 'react'
import CreateTask from '../components/CreateTask'
import TasksAllProjects from '../components/TasksAllProjects'

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
            <CreateTask getAllTasks={getAllTasks} />
        </>
  )
}

export default ProjectsDetail