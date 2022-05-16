import React, { useEffect, useContext } from 'react';
import { ProjectContext } from '../../context/getProject';
import { useParams } from 'react-router-dom';
import TaskCreate from '../../components/TaskCreate/TaskCreate';
import TasksOneProject from '../../components/TasksOneProject/TasksOneProject';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

const ProjectDetail = () => {
    
    const {getProject, project, setProject} = useContext(ProjectContext)
    const { id } = useParams()
    const storedToken = localStorage.getItem('authToken')

    const onDragEnd = result => {

        const {destination, source, draggableId} = result

        if(!destination) {
            return
        }
        if(destination.droppableId === source.destination && destination.index === source.index) {
            return
        }

        const startTaskArr = project.tasksByStatus.find(column => column.status._id === source.droppableId).tasks
        // const finishTaskArr = project.tasksByStatus.find(column => column.status._id === destination.droppableId).tasks

        const startColumn = source.droppableId
        const finishColumn = destination.droppableId

        // const startIndex = source.droppableIndex
        // const finishIndex = destination.droppableIndex

        if (startColumn === finishColumn) {
            const adjustedTaskArr = Array.from(startTaskArr)
            const draggedElement = adjustedTaskArr.splice(source.index, 1)
            adjustedTaskArr.splice(destination.index, 0, draggedElement[0])
            // pass Object im state an
            const projectCopy = JSON.parse(JSON.stringify(project))
            projectCopy.tasksByStatus.find(column => column.status._id === source.droppableId).tasks = adjustedTaskArr

            console.log('State: ', project.tasksByStatus[0]);
            console.log('Copy: ', projectCopy.tasksByStatus[0]);

            axios.put(`/api/projects/state/${id}`, projectCopy, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( project => setProject( () => projectCopy))
            .catch(error => console.log(error))
            return;
        }

    }

    // useEffect(() => {getProject(id)}, [])

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