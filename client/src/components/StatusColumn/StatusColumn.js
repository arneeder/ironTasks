import React, { useContext } from 'react';
import './index.css'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from '../TaskCard/TaskCard';
import Button from '../Button/Button';
import { ProjectContext } from '../../context/getProject';

const StatusColumn = props => {

    const { taskCreate, setTaskCreate } = useContext(ProjectContext)

    return (
        <Draggable draggableId={props.status._id} index={props.index}>
        {(provided, snapshot) => (
            <div className='column-container'
                {...provided.draggableProps}
                
                ref={provided.innerRef}
            >
                <header className='column-header'
                    {...provided.dragHandleProps}
                >
                    <h3>{props.status.name}</h3>
                    <Button 
                        className={'btn-round'}
                        content={'+'}
                        trigger={taskCreate}
                        setTrigger={setTaskCreate}
                    />
                </header>
                <Droppable droppableId={props.status._id}>
                {(provided, snapshot) => (

                <div className='staus-columns'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    
                    
                    {
                        props.tasks
                            .map( (task, index) => (
                                <TaskCard key={task._id} task={task} index={index} />
                        ))
                    }
                </div>
            )}
            </Droppable>
        </div>
        )}
        </Draggable>
        
    )
}

export default StatusColumn