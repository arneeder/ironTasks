import './index.css'
import React, { useState, useEffect, useContext } from 'react'
import ProjectCreate from '../ProjectCreate/ProjectCreate'
import ProjectList from '../ProjectList/ProjectList'
import axios from 'axios'
import Popup from '../Popup/Popup'
import ProjectEdit from '../ProjectEdit/ProjectEdit'
import { ProjectContext } from '../../context/getProject'

const Projects = () => {

    const storedToken = localStorage.getItem('authToken')
    const { projectEdit, setProjectEdit, getProject, projectPopup, setProjectPopup } = useContext(ProjectContext)

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
            <ProjectCreate getMyProjects={getMyProjects}/>
            <ProjectList
                myProjects={myProjects}  
                getMyProjects={getMyProjects}
            />
        </>
    )
}

export default Projects