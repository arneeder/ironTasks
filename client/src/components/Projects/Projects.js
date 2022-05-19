import './index.css'
import React, { useState, useEffect } from 'react'
import ProjectCreate from '../ProjectCreate/ProjectCreate'
import ProjectList from '../ProjectList/ProjectList'
import axios from 'axios'

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
            <h2>Projects</h2>
            <ProjectCreate getMyProjects={getMyProjects}/>
            <ProjectList
                myProjects={myProjects}  
                getMyProjects={getMyProjects}
            />
        </>
    )
}

export default Projects