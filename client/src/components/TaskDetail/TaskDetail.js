import './index.css';
import Multiselect from 'multiselect-react-dropdown';
import React, { useContext, useState, useEffect } from 'react';
import { ProjectContext } from '../../context/getProject';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import axios from 'axios';

const TaskDetail = props => {

    const { currentTask, projectMembers, getProject } = useContext(ProjectContext)
    const storedToken = localStorage.getItem('authToken')
    
    const [personsInProject, setPersonsInProject] = useState([])
    const [task, setTask] = useState(currentTask)

    const onAccountableSelect = (selectedList, selectedItem) => {
        const taskCopy = JSON.parse(JSON.stringify(task))
        taskCopy.accountable = selectedItem.id
        setTask( () => taskCopy )
    }
    const onResponsibleSelect = (selectedList, selectedItem) => {
        const taskCopy = JSON.parse(JSON.stringify(task))
        taskCopy.responsible = selectedItem.id
        setTask( () => taskCopy )
    }
    const handleSubmit = e => { 
        e.preventDefault()
        axios.put(`/api/tasks/${task?._id}`, task, { headers: { Authorization: `Bearer ${storedToken}` } } )
            .then( task => {
                getProject( props.projectId, props.setProject )
                props.setTrigger( () => false ) 
            })
            .catch ( err => console.log(err) )
    }

    useEffect( () => {
        if (!task) setTask( () => currentTask )
        const members = []
        projectMembers.forEach( projectMember => {
            members.push({
                id: projectMember._id,
                name: projectMember.name
            })
        })
        setPersonsInProject( () => members)
    }, [])

    return (
        <>
            <div className='task-detail-container'>
                <header className='header-task-detail'>
                    <h2>{currentTask.name}</h2>
                </header>
                <div className="task-detail-information">
                    <article className='task-detail-text'>
                        <h4>Details: </h4>
                        <p>{ currentTask.description }</p>
                    </article>
                    <form onSubmit={handleSubmit} className='task-ownership'>
                        <article>
                            <h4>Accountable: </h4>
                            <Multiselect
                                options={personsInProject}
                                selectedValues={ task.accountable }
                                onSelect={onAccountableSelect}
                                displayValue="name"
                                singleSelect={true}
                                placeholder={ task.accountable?.name }
                            />
                        </article>
                        <article>
                            <h4>Responsible: </h4>
                            <Multiselect
                                options={personsInProject}
                                selectedValues={ task.responsible }
                                onSelect={onResponsibleSelect}
                                displayValue="name"
                                singleSelect={true}
                                placeholder={ task.responsible?.name }
                            />
                        </article>
                        <ButtonSubmit 
                            className={'btn-small'}
                            content={'Save'}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default TaskDetail