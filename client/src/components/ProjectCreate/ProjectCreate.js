import './index.css'
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const ProjectCreate = props => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const storedToken = localStorage.getItem('authToken')
    
    const handleSubmit = e => {
        e.preventDefault()
        axios.post('/api/projects/', {name, description}, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( response => {
                setName(() => '')
                setDescription(() => '')
                props.getMyProjects()
            })
            .catch(err => console.log(err))
    }
    const handleName = e => setName( () => e.target.value)
    const handleDescription = e => setDescription( () => e.target.value)
  
    return (
        <>
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" value={name} onChange={handleName} />

                <label htmlFor="description">Description: </label>
                <input type="text" value={description} onChange={handleDescription} />
                
                <Button variant="primary" type="submit">Create New Project</Button>{' '}
            </form>
        </>
    )
}

export default ProjectCreate