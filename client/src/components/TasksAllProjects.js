import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';

const TasksAllProjects = props => {
    


    useEffect(() => {props.getAllTasks()}, [])

    return (
    <>
        {
            props.tasks.map( task => (
                <Card key={task._id} >
                    <Card.Body>
                        <Card.Title>{task.name}</Card.Title>
                        <Card.Text>
                            <p>{task.description}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))
        }
    </>
    )
}

export default TasksAllProjects