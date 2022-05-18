import './index.css';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../context/getProject';
import Multiselect from 'multiselect-react-dropdown';
import { MyProjectsContext } from '../../context/getMyProjects'

const ProjectEdit = () => {
    
    const { project, setProject, getProject } = useContext(ProjectContext)
    const { getMyProjects } = useContext(MyProjectsContext)
    const storedToken = localStorage.getItem('authToken')


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
        
            getMyProjects()
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
        getMyProjects()
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
                    options={memberOptions} // Options to display in the dropdown
                    selectedValues={selectedMemberOptions} // Preselected value to persist in dropdown
                    onSelect={onMemberSelect} // Function will trigger on select event
                    onRemove={onMemberRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    showCheckbox={true}
                />
                
                <button type="submit">Edit Task</button>
            </form>
    </>
  )
}

export default ProjectEdit