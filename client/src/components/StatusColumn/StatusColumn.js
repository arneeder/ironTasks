import React, { useEffect, useContext } from 'react';
import './index.css'
import TaskContext from '../../context/task';
import TaskCard from '../TaskCard/TaskCard';

const StatusColumn = props => {

    const { getTasks, tasks, projectId } = useContext(TaskContext)    

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <div className='staus-columns'>
            <h3>{props.status.name}</h3>
            {
                tasks
                    .filter( task => {
                        const projectStatus = task.projects.find( project => project.project === projectId)
                        return projectStatus.status === props.status._id
                    })
                    .map( task => (
                        <TaskCard key={task._id} task={task} />
                ))
            }
        </div>
    )
}

export default StatusColumn