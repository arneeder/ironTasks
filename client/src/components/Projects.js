import React, { useState } from 'react'
import CreateProject from './CreateProject'
import ProjectList from './ProjectList'
import axios from 'axios'

const Projects = () => {
  
  const storedToken = localStorage.getItem('authToken')

  const [projects, setProjects] = useState([])

  const getMyProjects = () => {
    axios.get('/api/projects/',  { headers: { Authorization: `Bearer ${storedToken}` } } )
        .then( myProjects => {
            setProjects(() => myProjects.data)
        })
        .catch(error => console.log(error))
}
  
  return (
    <>
        <h2>Projects</h2>
        <CreateProject getMyProjects={getMyProjects} />
        <ProjectList getMyProjects={getMyProjects} projects={projects} />
    </>
  )
}

export default Projects