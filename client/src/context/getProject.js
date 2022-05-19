import React, { useState } from 'react';
import axios from 'axios';

const ProjectContext = React.createContext()

const ProjectWrapper = props => {



    const storedToken = localStorage.getItem('authToken')

    const [projectPopup, setProjectPopup] = useState([])
    const [availableStatusses, setAvailableStatusses] = useState([])
    const [projectMembers, setProjectMembers] = useState([])
    const [tasks, setTasks] = useState([])
    const [taskCreate, setTaskCreate] = useState(false)
    const [taskPull, setTaskPull] = useState(false)
    const [taskDetail, setTaskDetail] = useState(false)
    const [columnCreate, setColumnCreate] = useState(false)
    const [currentTask, setCurrentTask] = useState('')
    const [projectEdit, setProjectEdit] = useState(false)

    const getProject = ( projectId, setProject='' ) => {
        axios.get(`/api/projects/${projectId}`,  { headers: { Authorization: `Bearer ${storedToken}` } } )
            .then( projectFromDb => {
              const availableStatusses = []
              const projectMembers = []
              const tasks = []
              
              projectFromDb.data.tasksByStatus.forEach(statusWithTasks => {
                  availableStatusses.push(statusWithTasks.status)
              })
              
              projectFromDb.data.members.forEach(projectMember => {
                  projectMembers.push(projectMember)
              })
  
              projectFromDb.data.tasksByStatus.forEach(statusColumn => {
                  tasks.push(statusColumn)
              })
  
              setTasks(() => tasks)
              setProjectMembers(() => projectMembers)
              setAvailableStatusses(() => availableStatusses)
              if (setProject) setProject(() => projectFromDb.data)
              setProjectPopup(() => projectFromDb.data)
            })
            .catch(error => console.log(error))
    }
    const getCurrentTask = currentTaskId => {
        axios.get(`/api/tasks/${currentTaskId}`,  { headers: { Authorization: `Bearer ${storedToken}` } } )
                .then( taskFromDb => {
                    setCurrentTask(() => taskFromDb.data)
                    console.log(taskFromDb)
                } )
                .catch( err => console.log(err) )
    }


    return(
        <ProjectContext.Provider
            value={{
                projectPopup,
                setProjectPopup,
                availableStatusses,
                setAvailableStatusses,
                projectMembers,
                setProjectMembers,
                tasks,
                setTasks,
                getProject,
                taskCreate,
                setTaskCreate,
                taskPull,
                setTaskPull,
                taskDetail,
                setTaskDetail,
                columnCreate,
                setColumnCreate,
                currentTask,
                getCurrentTask,
                projectEdit,
                setProjectEdit
                }}>
			{props.children}
		</ProjectContext.Provider>
    )
}

export { ProjectContext, ProjectWrapper }
