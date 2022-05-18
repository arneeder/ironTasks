import './index.css';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../context/getProject';
import Multiselect from 'multiselect-react-dropdown';

const ProjectEdit = () => {
    
    const { project } = useContext(ProjectContext)
    const storedToken = localStorage.getItem('authToken')


    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [memberOptions, setMemberOptions] = useState([])
    const [selectedMemberOptions, setSelectedMemberOptions] = useState([])

    const onMemberSelect = () => {
        console.log('select member');
    }
    const onMemberRemove = () => {
        console.log('remove member');
    }
    const handleSubmit = () => {
        console.log('handle submit');
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
                />
                
                <button type="submit">Create Task</button>
            </form>
    </>
  )
}

export default ProjectEdit