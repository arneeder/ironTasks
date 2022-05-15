import './index.css'
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import TaskContext from '../../context/task';
import Button from 'react-bootstrap/Button';

const CreateTask = () => {
    
    const { projectId, storedToken, getAvailableStatus, getProjectMembers, projectMembers, availableStatusses, getTasks, project, setProject } = useContext(TaskContext)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [accountable, setAccountable] = useState('')
    const [responsible, setResponsible] = useState('')
    const [status, setStatus] = useState('')

    
    const handleSubmit = e => {
        e.preventDefault()
        const projects = [{project: projectId, status: status}]
        const requestBody = { name, description, accountable, responsible, projects }
        postNewTask(requestBody)
        getTasks()
    }
    const handleName = e => setName(() => e.target.value)
    const handleDescription = e => setDescription(() => e.target.value)
    const handleAccountable = e => {
        setAccountable(() => e.target.value)
    } 
    const handleResponsible = e => setResponsible(() => e.target.value)
    const handleStaus = e => setStatus(() => e.target.value)



    const postNewTask = requestBody => {
        axios.post(`/api/tasks/project/${projectId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( task => {                
                const taskId = task.data._id
                console.log({taskId}, {status});
                
                //updateProjectState(status, taskId)
                const updateParameter = {
                    oldProject: project,
                    statusId: status,
                    taskId: taskId
                }

                axios.put(`/api/projects/${projectId}`, updateParameter, { headers: { Authorization: `Bearer ${storedToken}` } })
                    .then( project => setProject( () => project))
                    .catch(error => console.log(error))

                setName( () => '' )
                setDescription( () => '' )
                setAccountable( () => '' )
                setResponsible( () => '' )
                setStatus( () => '' )
            })
            .catch(error => console.log(error))
    }
    const updateProjectState = (statusId, taskId) => {
        const projectCopy = JSON.parse(JSON.stringify(project))
        console.log('TASKS: ', projectCopy.tasksByStatus)
        projectCopy.tasksByStatus.find( statusCol => statusCol.status === statusId).tasks.push(taskId)
        console.log('STATUS_ID: ', statusId);
        updateProject(projectCopy)
        console.log({projectCopy});
    }
    const updateProject = updatedProject => {
        axios.put(`/api/projects/${projectId}`, updatedProject, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(()=> setProject(() => updatedProject))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getProjectMembers()
        getAvailableStatus()
    }, [])
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" value={name} onChange={handleName} />

                <label htmlFor="description">Description: </label>
                <input type="text" value={description} onChange={handleDescription} />

                <label htmlFor="accountable">Accountable: </label>
                <select value={accountable} onChange={handleAccountable} >
                <option>--choose--</option>
                    {
                        projectMembers.map( projectMember => (
                            <option key={projectMember._id} value={projectMember._id}>{projectMember.name}</option>
                        ))
                    }
                </select>

                <label htmlFor="responsible">Responsible: </label>
                <select value={responsible} onChange={handleResponsible}>
                <option>--choose--</option>
                    {
                        projectMembers.map( projectMember => (
                            <option key={projectMember._id} value={projectMember._id}>{projectMember.name}</option>
                        ))
                    }
                </select>

                <label htmlFor="status">Status: </label>
                <select value={status} onChange={handleStaus}>
                <option>--choose--</option>
                    {
                        availableStatusses.map( status => (
                            <option key={status.status._id} value={status.status._id}>{status.status.name}</option>
                        ))
                    }
                </select>

                <Button variant="primary" type="submit">Create Task</Button>
            </form>
        </>
  )
}

export default CreateTask