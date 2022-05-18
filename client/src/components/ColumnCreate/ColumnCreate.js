import React, { useState, useContext, useEffect } from 'react';
import './index.css';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import { ProjectContext } from '../../context/getProject';

const ColumnCreate = props => {

    const storedToken = localStorage.getItem('authToken')
    const { getProject } = useContext(ProjectContext)
    
    const [project, setProject] = useState({})
    const [statusName, setStatusName] = useState('')
    const [statusType, setStatusType] = useState('not started')
    
    const handleNameChange = e => {
        setStatusName(() => e.target.value)
    }
    const handleTypeChange = (selectedList, selectedItem) => {
        setStatusType( () => selectedItem.name )
    }
    const onSubmitHandler = e => {
        console.log('onSubmitExecuted')
        e.preventDefault()
        // two times axios
        axios.post('/api/status', { name: statusName, cluster: statusType }, { headers: { Authorization: `Bearer ${storedToken}` }} )
            .then( status => {
                const newProject = JSON.parse(JSON.stringify(project))
                newProject.tasksByStatus.push( { status: status.data._id, tasks: [] } )
                axios.put(`/api/projects/state/${props.projectId}`, newProject, { headers: { Authorization: `Bearer ${storedToken}` }} )
                    .then( project => setProject( () => project ) )
                    .catch( err => console.log(err) )
            } )
            .catch( err => console.log(err) )
    }

    useEffect( () => { getProject(props.projectId, setProject ) } , [])
    
    return (
        <form onSubmit={onSubmitHandler}>
            <label>Status Name: </label>
            <input className='staus-name-input' type="text" onChange={handleNameChange} />

            <label>Status Type: </label>
            <Multiselect
                    options={ [
                        { id: 'not started', name: 'not started' },
                        { id: 'in progress', name: 'in progress' },
                        { id: 'completed', name: 'completed' }
                    ] }
                    onSelect={handleTypeChange}
                    displayValue="name"
                    singleSelect={true}
                    className='staus-name-input'
                />
            <button type="submit">Create Column</button>
        </form>
    )
}

export default ColumnCreate