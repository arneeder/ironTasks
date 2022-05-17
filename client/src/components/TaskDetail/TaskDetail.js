import './index.css';
import React, { useContext } from 'react';
import { ProjectContext } from '../../context/getProject';

const TaskDetail = () => {

    const { currentTask } = useContext(ProjectContext)
    
    console.log(currentTask);

    return (
        <>
            <h2>{currentTask.name}</h2>
            <article>
                <h4>Details: </h4>
                <p>{currentTask.description}</p>
            </article>
            {/* <article>
                <h4>Accountable: </h4>
                <p>{currentTask.accountable.name}</p>
            </article> */}
            {/* <article>
                <h4>Responsible: </h4>
                <p>{currentTask.responsible.name}</p>
            </article> */}

        </>
    )
}

export default TaskDetail