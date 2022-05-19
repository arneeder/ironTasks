import './index.css'
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../../context/getProject';
import Button from '../Button/Button'

const CreateTask = () => {
    
    const { id } = useParams()
    const storedToken = localStorage.getItem('authToken')
    const { getProject, availableStatusses, projectMembers, taskPull, setTaskPull } = useContext(ProjectContext)

    const [project, setProject] = useState({})
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [accountable, setAccountable] = useState('')
    const [responsible, setResponsible] = useState('')
    const [status, setStatus] = useState('')
    
    const handleSubmit = e => {
        e.preventDefault()
        const projects = [{project: id, status: status}]
        const requestBody = { name, description, accountable, responsible, projects }
        postNewTask(requestBody)
        getProject(id)
    }
    const handleName = e => setName(() => e.target.value)
    const handleDescription = e => setDescription(() => e.target.value)
    const handleAccountable = e => setAccountable(() => e.target.value)
    const handleResponsible = e => setResponsible(() => e.target.value)
    const handleStaus = e => setStatus(() => e.target.value)

    const postNewTask = requestBody => {
        axios.post(`/api/tasks/project/${id}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( task => {                
                const taskId = task.data._id
                
                const updateParameter = {
                    oldProject: project,
                    statusId: status,
                    taskId: taskId
                }

                axios.put(`/api/projects/${id}`, updateParameter, { headers: { Authorization: `Bearer ${storedToken}` } })
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

    useEffect(() => {
        getProject(id, setProject)
    },[])
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="container-formfield">
                    <label htmlFor="name">Name: </label>
                    <input type="text" value={name} onChange={handleName} />
                </div>

                <div className="container-formfield">
                    <label htmlFor="description">Description: </label>
                    <textarea cols="30" rows="1" value={description} onChange={handleDescription} />
                </div>

                <div className="container-formfield">
                    <label htmlFor="accountable">Accountable: </label>
                    <select value={accountable} onChange={handleAccountable} >
                    <option>--choose--</option>
                        {
                            projectMembers.map( projectMember => (
                                <option key={projectMember._id} value={projectMember._id}>{projectMember.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="container-formfield">
                    <label htmlFor="responsible">Responsible: </label>
                    <select value={responsible} onChange={handleResponsible}>
                    <option>--choose--</option>
                        {
                            projectMembers.map( projectMember => (
                                <option key={projectMember._id} value={projectMember._id}>{projectMember.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="container-formfield">
                    <label htmlFor="status">Status: </label>
                    <select value={status} onChange={handleStaus}>
                    <option>--choose--</option>
                        {
                            availableStatusses.map( status => (
                                <option key={status._id} value={status._id}>{status.name}</option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">Create Task</button>
                <Button 
                    className={'btn-small'}
                    content={'Pull existent task'}
                    trigger={taskPull}
                    setTrigger={setTaskPull}
            />
            </form>
        </>
  )
}

export default CreateTask