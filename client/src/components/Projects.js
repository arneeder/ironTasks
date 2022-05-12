import React, { useState } from 'react'
import CreateProject from './CreateProject'
import ProjectList from './ProjectList'
import axios from 'axios'

const Projects = () => {
  
  return (
    <>
        <h2>Projects</h2>
        <CreateProject  />
        <ProjectList  />
    </>
  )
}

export default Projects