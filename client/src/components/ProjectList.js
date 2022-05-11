import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';

const ProjectList = () => {

    const [projects, setProjects] = useState([])
    const storedToken = localStorage.getItem('authToken')

    const getMyProjects = () => {
        axios.get('/api/projects/',  { headers: { Authorization: `Bearer ${storedToken}` } } )
            .then( myProjects => {
                setProjects(() => myProjects.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {getMyProjects()}, [])
  
    return (
        <>
            {
                projects.map( project => (
                    <Card>
                        <Card.Body>
                            <Card.Title>{project.name}</Card.Title>
                            <Card.Title>{project.description}</Card.Title>
                        </Card.Body>
                    </Card>
                ))
            }
        </>
  )
}

export default ProjectList