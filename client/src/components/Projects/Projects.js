import './index.css'
import React, { useState, useEffect } from 'react'
import ProjectCreate from '../ProjectCreate/ProjectCreate'
import ProjectList from '../ProjectList/ProjectList'
import axios from 'axios'
import MyTasks from '../MyTasks/MyTasks'

const Projects = () => {

    const storedToken = localStorage.getItem('authToken')

    const [myProjects, setMyProjects] = useState([])

    const getMyProjects = () => {
        axios.get('/api/projects/',  { headers: { Authorization: `Bearer ${storedToken}` } } )
            .then( myProjects => {
              setMyProjects(() => myProjects.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {getMyProjects()}, [])
  
    return (
        <>
            <h1>Overview</h1>
            <ProjectCreate getMyProjects={getMyProjects}/>
            <div className='overview-details'>
                <ProjectList
                    className='project-list'
                    myProjects={myProjects}  
                    getMyProjects={getMyProjects}
                />
                <MyTasks className='task-list'/>
            </div>
        </>
    )
}

export default Projects