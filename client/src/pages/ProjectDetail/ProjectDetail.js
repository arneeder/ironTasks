import './index.css'
import React, { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../context/getProject';
import { useParams } from 'react-router-dom';
import Popup from '../../components/Popup/Popup';
import TasksOneProject from '../../components/TasksOneProject/TasksOneProject';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import TaskDetail from '../../components/TaskDetail/TaskDetail';
import ColumnCreate from '../../components/ColumnCreate/ColumnCreate';

const ProjectDetail = () => {
    
    const { id } = useParams()
    const { getProject, taskDetail, setTaskDetail, columnCreate, setColumnCreate } = useContext(ProjectContext)

    const [project, setProject] = useState({})


    const onDragEnd = result => {

        const storedToken = localStorage.getItem('authToken')
        
        const {destination, source, draggableId, type} = result

        if(!destination) {
            return
        }
        if(destination.droppableId === source.destination && destination.index === source.index) {
            return
        }

        // move columns
        if(type === 'column') {
            const newColumnOrder = project.tasksByStatus
            const draggedElement = newColumnOrder.splice(source.index, 1)
            newColumnOrder.splice(destination.index, 0, draggedElement[0])

            const newProject = JSON.parse(JSON.stringify(project))
            newProject.tasksByStatus = newColumnOrder

            axios.put(`/api/projects/state/${id}`, newProject, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( project => {
                getProject(id, setProject)
                setProject( () => project)
            } )
            .catch(error => console.log(error))

            return;
        } 
        // move tasks
        else {
            const startTaskArr = project.tasksByStatus.find(column => column.status._id === source.droppableId).tasks
            const finishTaskArr = project.tasksByStatus.find(column => column.status._id === destination.droppableId).tasks
    
            const startColumn = source.droppableId
            const finishColumn = destination.droppableId
            
            //move tasks within one column
            if (startColumn === finishColumn) {
                const startTaskArrAdjusted = Array.from(startTaskArr)
                const draggedElement = startTaskArrAdjusted.splice(source.index, 1)
                startTaskArrAdjusted.splice(destination.index, 0, draggedElement[0])
                
                const projectCopy = JSON.parse(JSON.stringify(project))
                projectCopy.tasksByStatus.find(column => column.status._id === source.droppableId).tasks = startTaskArrAdjusted
    
                axios.put(`/api/projects/state/${id}`, projectCopy, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then( project => getProject(id, setProject) )
                .catch(error => console.log(error))
                return;
            }
            
            // move tasks between columns
            const startTaskArrAdjusted = Array.from(startTaskArr)
            const draggedElement = startTaskArrAdjusted.splice(source.index, 1)
            
            const finishTaskArrAdjusted = Array.from(finishTaskArr)
            finishTaskArrAdjusted.splice(destination.index, 0, draggedElement[0])
    
            const projectCopy = JSON.parse(JSON.stringify(project))
            projectCopy.tasksByStatus.find(column => column.status._id === source.droppableId).tasks = startTaskArrAdjusted
            projectCopy.tasksByStatus.find(column => column.status._id === destination.droppableId).tasks = finishTaskArrAdjusted
    
            axios.put(`/api/projects/state/${id}`, projectCopy, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( project => getProject(id, setProject))
            .catch(error => console.log(error))

            const statusId = destination.droppableId
            const task = draggedElement[0]



            axios.get(`/api/status/cluster/${statusId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(cluster => {
                    const statusCluster = cluster.data
                    task.statusCluster = statusCluster
                    
                    axios.put(`/api/tasks/${task._id}`, task, { headers: { Authorization: `Bearer ${storedToken}` } })
                        .then(newTask => console.log(newTask))
                        .catch(error => console.log(error))

                })
                .catch(error => console.log(error))
            

            return;

        }
    }

    useEffect(() => {
        getProject(id, setProject)
    }, [])

    return (
        <div className='project-board-container'>
            <DragDropContext onDragEnd={onDragEnd}>

                    <Popup 
                        trigger={taskDetail}
                        setTrigger={setTaskDetail}
                    >
                    <TaskDetail
                        projectId={id}
                        project={project} 
                        setTrigger={setTaskDetail}
                        setProject={setProject}
                    />
                    </Popup>

                    <Popup 
                        trigger={columnCreate}
                        setTrigger={setColumnCreate}
                    >
                        <ColumnCreate projectId={id} />
                    </Popup>

                    <TasksOneProject
                        setProject={setProject}
                        
                    />
             </DragDropContext>
        </div>
    )
}

export default ProjectDetail