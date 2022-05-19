import axios from 'axios';
import './index.css';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import Button from '../Button/Button';
import { ProjectContext } from '../../context/getProject';
import Popup from '../Popup/Popup';
import ProjectEdit from '../ProjectEdit/ProjectEdit';

const ProjectCard = props => {

    const storedToken = localStorage.getItem('authToken')
    const { getProject, projectEdit, setProjectEdit } = useContext(ProjectContext)
    
    const [project, setProject] = useState([])
    
    const handleDelete = e => {
        e.preventDefault()
        const projectId = e.target[0].value
        axios.delete(`/api/projects/${projectId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                props.getMyProjects()
                return props.getMyProjects()
            })
            .catch(err => console.log(err))
    }

    useEffect( () => {
        getProject(props.projectId, setProject)

    }, [])

    console.log('Project from Card: ', project);
  
    return (
        <div className='task-card-container'>
            <h3>{project?.name}</h3>
            <p>{project?.description}</p>
            <div className='btns'>
                <Link to={`/ProjectDetail/${project?._id}`}>
                    <ButtonSubmit className="btn-small" content={"View Board"} />
                </Link>
                <form onSubmit={handleDelete}>
                    <input type="hidden" value={ project?._id } />
                    <ButtonSubmit className="btn-small" content={"Delete"} />
                </form>
                <Button 
                    className={'btn-small'}
                    content={'edit'}
                    trigger={projectEdit}
                    setTrigger={setProjectEdit}
                />
            </div>
            <Popup 
                trigger={projectEdit}
                setTrigger={setProjectEdit}
            >
                <ProjectEdit
                    project={project}
                    setProject={setProject}
                    getMyProjects={props.getMyProjects} 
                />
            </Popup>
        </div>
  )
}

export default ProjectCard