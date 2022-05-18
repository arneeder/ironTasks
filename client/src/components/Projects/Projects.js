import './index.css'
import React, { useContext } from 'react'
import ProjectCreate from '../ProjectCreate/ProjectCreate'
import ProjectList from '../ProjectList/ProjectList'
import Popup from '../Popup/Popup'
import ProjectEdit from '../ProjectEdit/ProjectEdit'
import { ProjectContext } from '../../context/getProject'

const Projects = () => {

    const { projectEdit, setProjectEdit } = useContext(ProjectContext)
  
    return (
        <>
            <h2>Projects</h2>
            <ProjectCreate  />
            <ProjectList  />
            <Popup 
                trigger={projectEdit}
                setTrigger={setProjectEdit}
            >
                <ProjectEdit />
            </Popup>
        </>
    )
}

export default Projects