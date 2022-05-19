import './index.css';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../context/getProject';
import Multiselect from 'multiselect-react-dropdown';

const ProjectEdit = props => {
    
    const {  getProject } = useContext(ProjectContext)
    const storedToken = localStorage.getItem('authToken')

    const [project, setProject] = useState({})
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [memberOptions, setMemberOptions] = useState([])
    const [selectedMemberOptions, setSelectedMemberOptions] = useState([])

    const onMemberSelect = (selectedList, selectedItem) => {
        setSelectedMemberOptions( () => selectedList )
    }
    const onMemberRemove = (selectedList, selectedItem) => {
        setSelectedMemberOptions( () => selectedList )
    }
    const handleSubmit = e => {
        e.preventDefault()
        
        const memberList = []
        selectedMemberOptions.forEach( member => {
            memberList.push(member.id)
        })

        const adjustedProject = {
            name: name,
            description: description,
            members: memberList,
            tasksByStatus: project.tasksByStatus,
            parentProject: project.parentProject,
            childProjects: project.childProjects
        }

        axios.put(`/api/projects/state/${project._id}`, adjustedProject, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( newProject => setProject( () => newProject ) )
            .catch( err => console.log(err) )
        
            props.getMyProjects()
            getProject(project._id)
    }

    const getAllUsers = () => {
        axios.get('api/users', { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( users => {
                const userNames = []
                users.data.forEach(user => {
                    userNames.push({name: user.name, id: user._id})
                    setMemberOptions( () => userNames )
                })
            } )
            .catch( err => console.log(err) )
    }
    const getProjectUsers = projectId => {
        axios.get(`api/users/project/${projectId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then( users => {
            const userNames = []
            users.data.forEach(user => {
                userNames.push({name: user.name, id: user._id})
                setSelectedMemberOptions( () => userNames )
            })
        } )
            .catch( err => console.log(err) )
    }

    useEffect(() => {
        getProject(project._id, setProject)
        props.getMyProjects()
        getAllUsers()
        getProjectUsers(project._id)
    }, [])
    
    return (
        <>
            <h1>Edit Project</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" value={name} onChange={e => setName( () => e.target.value)} />

                <label htmlFor="description">Description: </label>
                <input type="text" value={description} onChange={e => setDescription( () => e.target.value)} />

                <label htmlFor="members">Members: </label>     
                <Multiselect
                    options={memberOptions}
                    selectedValues={selectedMemberOptions}
                    onSelect={onMemberSelect}
                    onRemove={onMemberRemove}
                    displayValue="name"
                    showCheckbox={true}
                />
                
                <button type="submit">Edit Task</button>
            </form>
    </>
  )
}

export default ProjectEdit