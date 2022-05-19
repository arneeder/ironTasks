import './index.css'
import React, { useContext, useState, useEffect } from 'react'
import ProjectCreate from '../ProjectCreate/ProjectCreate'
import ProjectList from '../ProjectList/ProjectList'
import Popup from '../Popup/Popup'
import ProjectEdit from '../ProjectEdit/ProjectEdit'
import { ProjectContext } from '../../context/getProject'
import axios from 'axios'

const Projects = () => {

    const storedToken = localStorage.getItem('authToken')
    const { projectEdit, setProjectEdit } = useContext(ProjectContext)

    const [myProjects, setMyProjects] = useState([])

    const getMyProjects = () => {
        axios.get('/api/projects/',  { headers: { Authorization: `Bearer ${storedToken}` } } )
            .then( myProjects => {
              setMyProjects(() => myProjects.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {getMyProjects()}, [])
  
    return (
        <>
            <h2>Projects</h2>
            <ProjectCreate  />
            <ProjectList myProjects={myProjects}  />
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