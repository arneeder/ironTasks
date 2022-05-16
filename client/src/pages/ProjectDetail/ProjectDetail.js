import React, { useEffect, useContext } from 'react';
import { ProjectContext } from '../../context/getProject';
import { useParams } from 'react-router-dom';
import TaskCreate from '../../components/TaskCreate/TaskCreate';
import TasksOneProject from '../../components/TasksOneProject/TasksOneProject';
import { DragDropContext } from 'react-beautiful-dnd';

const ProjectDetail = () => {
    
    const {getProject, project} = useContext(ProjectContext)
    const { id } = useParams()

    const onDragEnd = result => {

        getProject(id)

        const {destination, source, draggableId} = result

        if(!destination) {
            return
        }
        if(destination.droppableId === source.destination && destination.index === source.index) {
            return
        }

        console.log({project});

        const startTaskArr = project.tasksByStatus.find(column => column.status === source.droppableId).tasks
        const finishTaskArr = project.tasksByStatus.find(column => column.status === destination.droppableId).tasks

        const startColumn = source.droppableId
        const finishColumn = destination.droppableId

        // const startIndex = source.droppableIndex
        // const finishIndex = destination.droppableIndex

        if (startColumn === finishColumn) {
            console.log({startTaskArr});
            const newStartTaskArr = Array.from(startTaskArr)
            newStartTaskArr.splice(source.index, 1)
            newStartTaskArr.splice(destination.index, 0, draggableId)
            console.log({newStartTaskArr});

        }

    }

    useEffect(() => {getProject(id)}, [])

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                    
                    <TaskCreate/>
                    <TasksOneProject />

             </DragDropContext>
        </>
    )
}

export default ProjectDetail