import React, { useContext } from 'react'
import './index.css'
import { Draggable } from 'react-beautiful-dnd';
import Button from '../Button/Button'
import { ProjectContext } from '../../context/getProject';

const TaskCard = props => {
    
    const { taskDetail, setTaskDetail } = useContext(ProjectContext)

    return (
        <Draggable draggableId={props.task._id} index={props.index}>
            {(provided, snapshot) => (
                <div className="card"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        //isDragging={snapshot.isDragging}
                >
                    <div>
                        <h4>{props.task?.name}</h4>
                        <p>{props.task?.description}</p>
                    </div>
                    <Button 
                        className={'btn-small'}
                        content={'View Details'}
                        trigger={taskDetail}
                        setTrigger={setTaskDetail}
                        taskId={props.task._id}
                    />
                </div>
                )}
        </Draggable>
    )
}

export default TaskCard