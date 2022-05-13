import './index.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

const CreateTask = props => {
    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [accountable, setAccountable] = useState('')
    const [responsible, setResponsible] = useState('')
    const [status, setStatus] = useState('')

    
    const handleSubmit = e => {
        e.preventDefault()
        const projects = [{project: props.id, status: status}]
        const requestBody = { name, description, accountable, responsible, projects }
        postNewTask(requestBody)
    }
    const handleName = e => setName(() => e.target.value)
    const handleDescription = e => setDescription(() => e.target.value)
    const handleAccountable = e => {
        setAccountable(() => e.target.value)
    } 
    const handleResponsible = e => setResponsible(() => e.target.value)
    const handleStaus = e => setStatus(() => e.target.value)

    const postNewTask = requestBody => {
        axios.post(`/api/tasks/project/${props.id}`, requestBody, { headers: { Authorization: `Bearer ${props.storedToken}` } })
            .then( task => {
                setName( () => '' )
                setDescription( () => '' )
                setAccountable( () => '' )
                setResponsible( () => '' )
                setStatus( () => '' )
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        props.getProjectMembers()
        props.getAvailableStatus()
    }, [])
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" value={name} onChange={handleName} />

                <label htmlFor="description">Description: </label>
                <input type="text" value={description} onChange={handleDescription} />

                <label htmlFor="accountable">Accountable: </label>
                <select value={accountable} onChange={handleAccountable} >
                <option>--choose--</option>
                    {
                        props.projectMembers.map( projectMember => (
                            <option key={projectMember._id} value={projectMember._id}>{projectMember.name}</option>
                        ))
                    }
                </select>

                <label htmlFor="responsible">Responsible: </label>
                <select value={responsible} onChange={handleResponsible}>
                <option>--choose--</option>
                    {
                        props.projectMembers.map( projectMember => (
                            <option key={projectMember._id} value={projectMember._id}>{projectMember.name}</option>
                        ))
                    }
                </select>

                <label htmlFor="status">Status: </label>
                <select value={status} onChange={handleStaus}>
                <option>--choose--</option>
                    {
                        props.availableStatusses.map( status => (
                            <option key={status.status._id} value={status.status._id}>{status.status.name}</option>
                        ))
                    }
                </select>

                <Button variant="primary" type="submit">Create Task</Button>
            </form>
        </>
  )
}

export default CreateTask