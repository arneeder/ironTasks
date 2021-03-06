import React, { useState } from 'react';
import './index.css'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from '../TaskCard/TaskCard';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';
import TaskCreate from '../TaskCreate/TaskCreate';
import TaskPull from '../../components/TaskPull/TaskPull';

const StatusColumn = props => {

    const [taskCreate, setTaskCreate] = useState(false)
    const [taskPull, setTaskPull] = useState(false)

    return (
        <div className='column-outer-container'>
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
                {provided.placeholder}
                </div>
            )}
            </Droppable>
        </div>
        )}
        </Draggable>

        <Popup 
            trigger={taskCreate}
            setTrigger={setTaskCreate}
        >
            <TaskCreate 
                status={props.status._id} 
                setTaskCreate={setTaskCreate}
                setTaskPull={setTaskPull}
            />
        </Popup>
        
        <Popup
            trigger={taskPull}
            setTrigger={setTaskPull}
        >
            <TaskPull
                setProject={props.setProject}
                project={props.project}
                status={props.status}
            />
        </Popup>
    </div>
    )
}

export default StatusColumn