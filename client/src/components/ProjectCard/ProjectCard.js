import axios from 'axios';
import './index.css';
import React, { useContext, useEffect } from 'react';
import { MyProjectsContext } from '../../context/getMyProjects';
import { Link } from 'react-router-dom';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import Button from '../Button/Button';
import { ProjectContext } from '../../context/getProject';

const ProjectCard = props => {

    const storedToken = localStorage.getItem('authToken')
    const { getMyProjects } = useContext(MyProjectsContext)
    const { getProject, project, projectEdit, setProjectEdit } = useContext(ProjectContext)
    //
    
    const handleDelete = e => {
        e.preventDefault()
        const projectId = e.target[0].value
        axios.delete(`/api/projects/${projectId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                getMyProjects()
                return getMyProjects
            })
            .catch(err => console.log(err))
    }

    useEffect( () => {
        getProject(props.projectId)

    }, [])

    console.log(project);
  
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
        </div>
  )
}

export default ProjectCard