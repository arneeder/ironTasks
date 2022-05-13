import axios from 'axios';
import React, { useState } from 'react';
import TaskContext from '../../context/task';
import { useParams } from 'react-router-dom';
import TaskCreate from '../../components/TaskCreate/TaskCreate';
import TasksOneProject from '../../components/TasksOneProject/TasksOneProject';
import { DragDropContext } from 'react-beautiful-dnd';

const ProjectDetail = () => {
    
    const storedToken = localStorage.getItem('authToken')
    const { id } = useParams()

    const [projectMembers, setProjectMembers] = useState([])
    const [availableStatusses, setAvailableStatusses] = useState([])
    const [tasks, setTasks] = useState([])
    
    const getProjectMembers = () => {
        const allProjectMembers = []
        axios.get(`/api/projects/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( project => {
                project.data.members.forEach( member => {
                    allProjectMembers.push(member)
                })
                setProjectMembers(() => allProjectMembers)
            })
            .catch(error => console.log(error))
    }

    const getAvailableStatus = () => {
        axios.get(`/api/status/project/${id}`)
            .then( statusses => {
                console.log({statusses});
                setAvailableStatusses( () => statusses.data )
            })
            .catch(error => console.log(error))
    }
    const getTasks = () => {
        axios.get(`/api/tasks/project/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( tasks => {
                setTasks(() => tasks.data)
            })
            .catch(error => console.log(error))
    }
    const contextObject = {
        projectId: id,
        getTasks,
        tasks,
        getAvailableStatus,
        availableStatusses,
        storedToken,
        getProjectMembers,
        projectMembers
    }
    const onDragEnd = result => {

        console.log('on drag end is executed');

        const {destination, source, draggableId} = result
        console.log({destination, source, draggableId})

        if(!destination) {
            return
        }
        if(destination.droppableId === source.destination && destination.index === source.index) {
            return
        }

        const start = 1 // get array with all tasks in column
        const finish = 1 // get array with all tasks in column
    }
    
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <TaskContext.Provider value={contextObject}
                >
                    <TaskCreate 
                        getProjectMembers={getProjectMembers}
                        projectMembers={projectMembers}
                        storedToken={storedToken}
                        id={id}
                        getAvailableStatus={getAvailableStatus}
                        availableStatusses={availableStatusses}
                    />
                    <TasksOneProject />
                </TaskContext.Provider>
             </DragDropContext>
        </>
    )
}

export default ProjectDetail