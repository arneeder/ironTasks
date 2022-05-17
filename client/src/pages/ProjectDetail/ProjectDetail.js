import React, { useState } from 'react';
import ProjectContext from '../../context/getProject';
import { useParams } from 'react-router-dom';
import Popup from '../../components/Popup/Popup';
import TaskCreate from '../../components/TaskCreate/TaskCreate';
import TasksOneProject from '../../components/TasksOneProject/TasksOneProject';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

const ProjectDetail = () => {
    
    const { id } = useParams()
    const storedToken = localStorage.getItem('authToken')

    const [project, setProject] = useState([])
    const [availableStatusses, setAvailableStatusses] = useState([])
    const [projectMembers, setProjectMembers] = useState([])
    const [tasks, setTasks] = useState([])
    const [popup, setPopup] = useState(false)

    const getProject = projectId => {
        axios.get(`/api/projects/${projectId}`,  { headers: { Authorization: `Bearer ${storedToken}` } } )
            .then( project => {
              const availableStatusses = []
              const projectMembers = []
              const tasks = []
              
              project.data.tasksByStatus.forEach(statusWithTasks => {
                  availableStatusses.push(statusWithTasks.status)
              })
              
              project.data.members.forEach(projectMember => {
                  projectMembers.push(projectMember)
              })
  
              project.data.tasksByStatus.forEach(statusColumn => {
                  tasks.push(statusColumn)
              })
  
              setTasks(() => tasks)
              setProjectMembers(() => projectMembers)
              setAvailableStatusses(() => availableStatusses)
              console.log('new Project from getProject: ', project.data);
              setProject(() => project.data)
            })
            .catch(error => console.log(error))
      }

    const onDragEnd = result => {

        const {destination, source, draggableId} = result

        if(!destination) {
            return
        }
        if(destination.droppableId === source.destination && destination.index === source.index) {
            return
        }

        const startTaskArr = project.tasksByStatus.find(column => column.status._id === source.droppableId).tasks
        const finishTaskArr = project.tasksByStatus.find(column => column.status._id === destination.droppableId).tasks

        const startColumn = source.droppableId
        const finishColumn = destination.droppableId

        if (startColumn === finishColumn) {
            const startTaskArrAdjusted = Array.from(startTaskArr)
            const draggedElement = startTaskArrAdjusted.splice(source.index, 1)
            startTaskArrAdjusted.splice(destination.index, 0, draggedElement[0])
            
            const projectCopy = JSON.parse(JSON.stringify(project))
            projectCopy.tasksByStatus.find(column => column.status._id === source.droppableId).tasks = startTaskArrAdjusted

            console.log('State: ', project.tasksByStatus[0]);
            console.log('Copy: ', projectCopy.tasksByStatus[0]);

            axios.put(`/api/projects/state/${id}`, projectCopy, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( project => getProject(id) )
            .catch(error => console.log(error))
            return;
        }

        const startTaskArrAdjusted = Array.from(startTaskArr)
        const draggedElement = startTaskArrAdjusted.splice(source.index, 1)
        
        const finishTaskArrAdjusted = Array.from(finishTaskArr)
        finishTaskArrAdjusted.splice(destination.index, 0, draggedElement[0])

        const projectCopy = JSON.parse(JSON.stringify(project))
        projectCopy.tasksByStatus.find(column => column.status._id === source.droppableId).tasks = startTaskArrAdjusted
        projectCopy.tasksByStatus.find(column => column.status._id === destination.droppableId).tasks = finishTaskArrAdjusted

        axios.put(`/api/projects/state/${id}`, projectCopy, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then( project => getProject(id))
        .catch(error => console.log(error))
        return;

    }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <ProjectContext.Provider value={{
                    project,
                    setProject,
                    availableStatusses,
                    setAvailableStatusses,
                    projectMembers,
                    setProjectMembers,
                    tasks,
                    setTasks,
                    getProject,
                    popup,
                    setPopup
                }}> 
                    <Popup trigger={popup}>
                        <TaskCreate/>
                    </Popup>
                    <TasksOneProject />
                </ProjectContext.Provider>   
             </DragDropContext>
        </>
    )
}

export default ProjectDetail