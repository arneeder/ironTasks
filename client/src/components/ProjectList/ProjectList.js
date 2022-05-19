import './index.css'
import React, { useEffect, useState } from 'react';
import { MyProjectsContext } from '../../context/getMyProjects';
import ProjectCard from '../ProjectCard/ProjectCard';
import axios from 'axios';

const ProjectList = () => {

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
    console.log({myProjects});

    return (
        <>
            {
                myProjects.map( project => (
                    <ProjectCard key={project._id} projectId={project._id} />
                ))
            }
        </>
  )
}

export default ProjectList