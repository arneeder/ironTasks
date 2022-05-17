import './index.css'
import React, { useEffect, useContext } from 'react';
import { MyProjectsContext } from '../../context/getMyProjects';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectList = () => {
    
    const { getMyProjects, myProjects } = useContext(MyProjectsContext)


    useEffect(() => {getMyProjects()}, [])
    console.log(myProjects[0]);
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