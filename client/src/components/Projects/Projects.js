import './index.css'
import React from 'react'
import ProjectCreate from '../ProjectCreate/ProjectCreate'
import ProjectList from '../ProjectList/ProjectList'

const Projects = () => {
  
  return (
    <>
        <h2>Projects</h2>
        <ProjectCreate  />
        <ProjectList  />
    </>
  )
}

export default Projects