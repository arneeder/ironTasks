import React, { useContext } from 'react';
import './index.css'
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from '../TaskCard/TaskCard';
import ButtonRound from '../ButtonRound/ButtonRound';

const StatusColumn = props => {

    return (
        <>
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
        <ButtonRound>+</ButtonRound>
        </>
        
    )
}

export default StatusColumn