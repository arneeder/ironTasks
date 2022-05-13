import React, { useEffect, useContext } from 'react';
import './index.css'
import TaskContext from '../../context/task';

const StatusColumn = props => {

    const { getTasks, tasks } = useContext(TaskContext)    

    useEffect(() => {
        getTasks()
    }, [])

    const taskArr = tasks.map( task => {
        const { _id, name, description } = task
        // du musst hier den richtigen Status für die aktuelle Projekt Id bekommen
            // die ID kannst du im Context hinzufügen
        // probiere, ob du Responsible & Accountable als Objekte oder NUR IDs bekmmst
            //füge die Namen hinzu
        return (
            { _id, name, description }
        )
    })

    return (
        <div className='staus-columns'>
            <h3>{props.status.name}</h3>
            {
                tasks
                    /* .filter( task => task.project.status) */
                    .map( task => (
                        <p key={task._id}>{task.name}</p>
                ))
            }
        </div>
    )
}

export default StatusColumn