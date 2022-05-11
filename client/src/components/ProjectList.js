import axios from 'axios'
import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ProjectList = props => {
    
    const storedToken = localStorage.getItem('authToken')
    
    const handleDelete = e => {
        e.preventDefault()
        const projectId = e.target[0].value
        axios.delete(`/api/projects/${projectId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                props.getMyProjects()
                return props.getMyProjects
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {props.getMyProjects()}, [])
  
    return (
        <>
            {
                props.projects.map( project => (
                    <Card key={project._id}>
                        <Card.Body>
                            <Card.Title>{project.name}</Card.Title>
                            <Card.Text>{project.description}</Card.Text>
                            <form onSubmit={handleDelete}>
                                <input type="hidden" value={ project._id } />
                                <Button variant="primary" type="submit">Delete</Button>
                            </form>
                        </Card.Body>
                    </Card>
                ))
            }
        </>
  )
}

export default ProjectList