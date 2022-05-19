import './index.css'
import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { ProjectContext } from '../../context/getProject';
import Multiselect from 'multiselect-react-dropdown';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import { useParams } from 'react-router-dom';

const TaskPull = props => {

    const storedToken = localStorage.getItem('authToken')
    const { setTaskCreate, getProject } = useContext(ProjectContext)
    const { id } = useParams()

    const [myTasks, setMyTasks] = useState([])
    const [newTask, setNewTask] = useState({})
    const [status, setStatus] = useState(props.status)
    const [projectTasks, setProjectTasks] = useState([])

    const getAvailableStatusses = () => {
        const availableStatusList = []
        props.project.tasksByStatus.forEach(statusWithTasks => {
            availableStatusList.push(statusWithTasks.status)
            // setAvailableStausses( () => availableStatusList )
        })
    }
    const getTaskList = () => {
        const taskList = []
        props.project.tasksByStatus.forEach(
            tasklist => {
                tasklist.tasks.forEach(
                    task => {
                        taskList.push(task._id)
                    }
                )
            }
        )
        setProjectTasks(taskList)
    }


    const getUserTasks = () => {
        axios.get('/api/tasks/', { headers: { Authorization: `Bearer ${storedToken}` } } )
            .then( tasks => {
                setMyTasks( () => tasks.data )
            } )
            .catch( err => console.log(err) )
    }
    
    const onMemberSelect = (selectedList, selectedItem) => {
        setNewTask( () => selectedItem )
    }
    // const onStatusSelect =  (selectedList, selectedItem) => {
    //     setStatus( () => selectedItem._id )
    // }
    const handleSubmit = e => {
        e.preventDefault()
        const newProjectsForTask = newTask.projects
        const updateParameterTask = JSON.parse(JSON.stringify(newTask))
        updateParameterTask.projects = newProjectsForTask


        axios.put(`/api/tasks/${id}`, updateParameterTask, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(task => console.log(task))
            .catch(error => console.log(error))
        const updateParameterProject = {
            oldProject: props.project,
            statusId: status._id,
            taskId: newTask._id
        }
        axios.put(`/api/projects/${id}`, updateParameterProject, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( project => {
                props.setProject( () => project)
                getProject(props.project._id, props.setProject)

            })
            .catch(error => console.log(error))
        
    }

    useEffect(() => {
        setTaskCreate( () => false )
        getUserTasks()
        getAvailableStatusses()
        if (!status) setStatus(() => status)
        getTaskList()
    }, [])

    
    console.log(projectTasks);
    return (
        <div className='task-pull-container'>
            <header className='header-task-pull'>
                <h2>Select Tasks</h2>
            </header>
            <form className='task-pull-content' onSubmit={handleSubmit}>
                <Multiselect
                    className="task-pull-select"
                    options={
                        myTasks
                            .filter( myTask => (
                            !projectTasks.includes( myTask._id )
                            ))
                            .filter( additionalTask => (
                                additionalTask.statusCluster === status.cluster
                            ) )
                    }
                    onSelect={onMemberSelect}
                    displayValue="name"
                    showCheckbox={true}
                    singleSelect={true}
                />
                {/* <Multiselect
                    className="task-pull-select"
                    options={availableStausses}
                    onSelect={onStatusSelect}
                    displayValue="name"
                    showCheckbox={true}
                    singleSelect={true}
                /> */}
                <ButtonSubmit 
                    className={"btn-small"}
                    content={'Add To Board'}
                />
            </form>
      </div>
    )
}


export default TaskPull