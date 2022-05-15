import React from 'react'
import './index.css'
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = props => {
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
                        <div className="assigned">
                            <div className="one-assignment">
                                <p><strong>Accountable: </strong></p>
                                <p>{props.task?.accountable}</p>
                            </div>
                            <div className="one-assignment">
                                <p><strong>Responsible: </strong></p>
                                <p>{props.task?.responsible}</p>
                            </div>
                            <div className="responsible"></div>
                        </div>
                    </div>
                </div>
                )}
        </Draggable>
    )
}

export default TaskCard