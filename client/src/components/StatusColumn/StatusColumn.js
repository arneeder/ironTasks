import React from 'react';
import './index.css'
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from '../TaskCard/TaskCard';

const StatusColumn = props => {
    console.log({props});
    return (
        
        <Droppable droppableId={props.status._id}>
        {(provided, snapshot) => (

        <div className='staus-columns'
            ref={provided.innerRef}
            {...provided.droppableProps}
        >
            
            <h3>{props.status.name}</h3>
            {
                props.tasks
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