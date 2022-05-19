import './index.css'
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectList = props => {

    return (
        <>
            {
                props.myProjects.map( project => (
                    <ProjectCard key={project._id}
                    projectId={project._id}
                    getMyProjects={props.getMyProjects}
                />
                ))
            }
        </>
  )
}

export default ProjectList