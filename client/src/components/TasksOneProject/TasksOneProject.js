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