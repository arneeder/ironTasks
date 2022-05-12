import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import CreateTask from '../components/CreateTask'

const ProjectDetail = () => {
    
    // find this project
    // get all members in arr -> pass this arr to CreateTask
    const storedToken = localStorage.getItem('authToken')
    const { id } = useParams()

    const [projectMembers, setProjectMembers] = useState([])
    const [availableStatusses, setAvailableStatusses] = useState([])
    // const [tasks, setTasks] = useState([])
    
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
    
    
    
    // THIS IS THE PAGE WHERE THE PRODUCT DETAIL VIEW WILL GO!!! (but I'll do this later in new component)

    // const getTasks = () => {
    //     axios.get(`api/tasks/project/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    //         .then( tasks => {
    //             setTasks(() => tasks)
    //         })
    //         .catch(error => console.log(error))
    // }
    
    return (
        <>
            <CreateTask 
                getProjectMembers={getProjectMembers}
                projectMembers={projectMembers}
                storedToken={storedToken}
                id={id}
                getAvailableStatus={getAvailableStatus}
                availableStatusses={availableStatusses}
            />
        </>
    )
}

export default ProjectDetail