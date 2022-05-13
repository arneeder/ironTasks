import React from 'react'
import './index.css'

const TaskCard = props => {
    return (
        <div className="card">
            <h4>{props.task.name}</h4>
            <p>{props.task.description}</p>
            {/* <div className="assigned">
                <div className="one-assignment">
                    <p><strong>Accountable: </strong></p>
                    <p>{props.task.accountable}</p>
                </div>
                <div className="one-assignment">
                    <p><strong>Responsible: </strong></p>
                    <p>{props.task.responsible}</p>
                </div>
                <div className="responsible"></div>
            </div> */}
        </div>
    )
}

export default TaskCard