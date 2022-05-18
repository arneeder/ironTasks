import './index.css'
import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../../context/getProject';
import StatusColumn from '../StatusColumn/StatusColumn';
import Button from '../Button/Button';

const TasksOneProject = () => {

    const { id } = useParams()
    const { getProject, tasks, columnCreate, setColumnCreate } = useContext(ProjectContext)


    useEffect(() => {
        getProject(id)
    }, [])

    return (
        <div className='container'>
            {
                tasks.map( (taskColumn) => (
                    <StatusColumn 
                        key={taskColumn.status._id}
                        status={taskColumn.status}
                        tasks={taskColumn.tasks} 
                        />
                ))
            }
            <Button 
                    className={'btn-round'}
                    content={'+'}
                    trigger={columnCreate}
                    setTrigger={setColumnCreate}
                />
        </div>
    )
}

export default TasksOneProject