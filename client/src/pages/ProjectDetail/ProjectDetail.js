import axios from 'axios'
import React, { useState } from 'react'
import TaskContext from '../../context/task'
import { useParams } from 'react-router-dom'
import ProjectCreate from '../../components/ProjectCreate/ProjectCreate'
import TasksOneProject from '../../components/TasksOneProject/TasksOneProject'

const ProjectDetail = () => {
    
    // find this project
    // get all members in arr -> pass this arr to CreateTask
    const storedToken = localStorage.getItem('authToken')
    const { id } = useParams()

    const [projectMembers, setProjectMembers] = useState([])
    const [availableStatusses, setAvailableStatusses] = useState([])
    const [tasks, setTasks] = useState([])
    
    const getProjectMembers = () => {
        const allProjectMembers = []
        axios.get(`/api/projects/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( project => {
                project.data.members.forEach( member => {
                    allProjectMembers.push(member)
                })
                setProjectMembers(() => allProjectMembers)
            })
            .catch(error => console.log(error))
    }

    const getAvailableStatus = () => {
        axios.get(`/api/status/project/${id}`)
            .then( statusses => {
                setAvailableStatusses( () => statusses.data )
            })
            .catch(error => console.log(error))
    }
    const getTasks = () => {
        axios.get(`/api/tasks/project/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( tasks => {
                setTasks(() => tasks.data)
            })
            .catch(error => console.log(error))
    }
    const contextObject = {
        getTasks,
        tasks,
        getAvailableStatus,
        availableStatusses
    }
    
    return (
        <>
            <TaskContext.Provider value={contextObject}
                // getTasks={getTasks}
                // tasks={tasks}
                // getAvailableStatus={getAvailableStatus}
                // availableStatusses={availableStatusses}
            >
                <ProjectCreate 
                    getProjectMembers={getProjectMembers}
                    projectMembers={projectMembers}
                    storedToken={storedToken}
                    id={id}
                    getAvailableStatus={getAvailableStatus}
                    availableStatusses={availableStatusses}
                />
                <TasksOneProject
                    // getTasks={getTasks}
                    // tasks={tasks}
                    // getAvailableStatus={getAvailableStatus}
                    // availableStatusses={availableStatusses}
                />
             </TaskContext.Provider>
        </>
    )
}

export default ProjectDetail