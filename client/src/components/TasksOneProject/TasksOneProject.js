import './index.css'
import React, { useEffect, useContext } from 'react';
import TaskContext from '../../context/task';
import StatusColumn from '../StatusColumn/StatusColumn';

const TasksOneProject = () => {

    const { getAvailableStatus, availableStatusses } = useContext(TaskContext)

    useEffect(() => {
        // getTasks()
        getAvailableStatus()
    }, [])

    // get statusses
    // make column component
    // map column component
    // in column component -> map tasks
    // start drag and drop somewhere
    return (
        <div className='container'>
            {
                availableStatusses.map( status => (
                    <StatusColumn key={status._id} status={status} />
                ))


            }
        </div>
    )
}

export default TasksOneProject