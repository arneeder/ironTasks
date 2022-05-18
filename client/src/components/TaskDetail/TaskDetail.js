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
                <p>{currentTask.description.length < 400 ? currentTask.description : currentTask.description.splice(0, 396) + '...'}</p>
            </article>
        </>
    )
}

export default TaskDetail