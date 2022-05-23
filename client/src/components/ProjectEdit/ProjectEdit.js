import './index.css';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { ProjectContext } from '../../context/getProject';


const ProjectEdit = props => {
    
    //const { props.project, setProjectPopup } = useContext(ProjectContext)
    
    const storedToken = localStorage.getItem('authToken')
    
    const [name, setName] = useState(props.project?.name)
    const [description, setDescription] = useState(props.project?.description)
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
            tasksByStatus: props.project.tasksByStatus,
            parentProject: props.project.parentProject,
            childProjects: props.project.childProjects
        }
        
        axios.put(`/api/projects/state/${props.project._id}`, adjustedProject, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( newProject => {
                props.getMyProjects()
                props.setTrigger( () => !props.trigger)
            })
            .catch( err => console.log(err) )
    
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
    const getProjectUsers = () => {
        axios.get(`api/users/project/${props.project?._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
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
        getProjectUsers(props.project?._id)
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