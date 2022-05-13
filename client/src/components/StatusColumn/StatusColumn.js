import React, { useEffect, useContext } from 'react';
import './index.css'
import { Droppable } from 'react-beautiful-dnd';
import TaskContext from '../../context/task';
import TaskCard from '../TaskCard/TaskCard';

const StatusColumn = props => {

    const { getTasks, tasks, projectId } = useContext(TaskContext)    

    useEffect(() => {
        getTasks()
    }, [])

    return (
        
        <Droppable droppableId={props.status._id}>
        {(provided, snapshot) => (

        <div className='staus-columns'
            ref={provided.innerRef}
            {...provided.droppableProps}
            // isDraggingOver={snapshot.isDraggingOver}
        >
            
            <h3>{props.status.name}</h3>
            {
                tasks
                    .filter( task => {
                        const projectStatus = task.projects.find( project => project.project === projectId)
                        return projectStatus.status === props.status._id
                    })
                    .map( (task, index) => (
                        <TaskCard key={task._id} task={task} index={index} />
                ))
            }
        </div>
        )}
        </Droppable>
        
    )
}

export default StatusColumn