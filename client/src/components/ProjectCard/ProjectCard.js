import axios from 'axios';
import './index.css';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import Button from '../Button/Button';
import { ProjectContext } from '../../context/getProject';
import Popup from '../Popup/Popup';
import ProjectEdit from '../ProjectEdit/ProjectEdit';


const ProjectCard = props => {

    const storedToken = localStorage.getItem('authToken')
    const { getProject } = useContext(ProjectContext)
    //const [project, setProject] = useState({})

    const [projectEdit, setProjectEdit] = useState(false)

    
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

    // useEffect( () => {
    //     getProject(props.projectId, setProject)

    // }, [])
  
    return (
        <div className='task-card-container'>
            <h3>{props.project?.name}</h3>
            <p>{props.project?.description}</p>
            <div className='btns'>
                <Link to={`/ProjectDetail/${props.project?._id}`}>
                    <ButtonSubmit className="btn-small" content={"View Board"} />
                </Link>
                <form onSubmit={handleDelete}>
                    <input type="hidden" value={ props.project?._id } />
                    <ButtonSubmit className="btn-small" content={"Delete"} />
                </form>
                <form onSubmit={() => getProject(props.project?._id)}>
                    <Button 
                        className={'btn-small'}
                        content={'edit'}
                        trigger={projectEdit}
                        setTrigger={setProjectEdit}
                    />
                </form>

                <Popup 
                trigger={projectEdit}
                setTrigger={setProjectEdit}
            >
            <ProjectEdit
                project={props.project}
                //setProject={setProjectPopup}
                getMyProjects={props.getMyProjects} 
                //getProject={getProject}
                trigger={projectEdit}
                setTrigger={setProjectEdit}
            />
            </Popup>

            </div>
        </div>
  )
}

export default ProjectCard