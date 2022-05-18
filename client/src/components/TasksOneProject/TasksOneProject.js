import './index.css'
import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../../context/getProject';
import StatusColumn from '../StatusColumn/StatusColumn';
import Button from '../Button/Button';
import { Droppable } from 'react-beautiful-dnd';

const TasksOneProject = () => {

    const { id } = useParams()
    const { getProject, tasks, columnCreate, setColumnCreate } = useContext(ProjectContext)


    useEffect(() => {
        getProject(id)
    }, [])

    return (
        <Droppable droppableId={"all-columns"} direction="horizontal" type="column">
        {(provided, snapshot) => (
        
        <div className='container'
            ref={provided.innerRef}
            {...provided.droppableProps}
        >
            {
                tasks.map( (taskColumn, index ) => (
                    <StatusColumn 
                        key={taskColumn.status._id}
                        status={taskColumn.status}
                        tasks={taskColumn.tasks} 
                        index={index}
                        />
                ))
            }
            <Button 
                    className={'btn-round'}
                    content={'+'}
                    trigger={columnCreate}
                    setTrigger={setColumnCreate}
                />
        {provided.placeholder}
        </div>
        )}
        </Droppable>
    )
}

export default TasksOneProject