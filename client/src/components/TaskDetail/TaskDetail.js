import './index.css';
import React, { useContext, useState } from 'react';
import ProjectContext from '../../context/getProject';
import axios from 'axios';

const TaskDetail = () => {

    const { currentTaskId } = useContext(ProjectContext)

    const [task, setTask] = useState({})
    
    axios.get(`/api/tasks/${currentTaskId}`)
        .then( taskFromDb => setTask(taskFromDb) )
        .catch( err => console.log(err) )

    console.log(task);
    return (
        <>
            <h2>{task.data.name}</h2>
            <article>
                <h4>Details: </h4>
                <p>{task.data.description}</p>
            </article>
            <article>
                <h4>Accountable: </h4>
                <p>{task.data.accountable.name}</p>
            </article>
            <article>
                <h4>Responsible: </h4>
                <p>{task.data.responsible.name}</p>
            </article>

        </>
    )
}

export default TaskDetail