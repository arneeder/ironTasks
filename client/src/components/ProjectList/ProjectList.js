import './index.css'
import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { MyProjectsContext } from '../../context/getMyProjects';
import { Link } from 'react-router-dom';

const ProjectList = props => {
    
    const storedToken = localStorage.getItem('authToken')
    const { getMyProjects, myProjects } = useContext(MyProjectsContext)
    console.log({myProjects})
    console.log(MyProjectsContext);
    
    const handleDelete = e => {
        e.preventDefault()
        const projectId = e.target[0].value
        axios.delete(`/api/projects/${projectId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                getMyProjects()
                return getMyProjects
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {getMyProjects()}, [])
  
    return (
        <>
            {
                myProjects.map( project => (
                    <Card key={project._id}>
                        <Card.Body>
                            <Card.Title>{project.name}</Card.Title>
                            <Card.Text>{project.description}</Card.Text>
                            <Link to={`/ProjectDetail/${project._id}`}>
                                <Button variant="primary">View Kanban Board</Button>
                            </Link>
                            <form onSubmit={handleDelete}>
                                <input type="hidden" value={ project._id } />
                                <Button variant="secondary" type="submit">Delete</Button>
                            </form>
                        </Card.Body>
                    </Card>
                ))
            }
        </>
  )
}

export default ProjectList