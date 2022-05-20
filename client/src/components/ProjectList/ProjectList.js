import './index.css'
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectList = props => {

    return (
        <div className='project-list-container'>
            <h2>My Projects</h2>
            {
                props.myProjects.map( project => (
                    <ProjectCard
                        key={project._id}
                        project={project}
                        getMyProjects={props.getMyProjects}
                />
                ))
            }
        </div>
  )
}

export default ProjectList