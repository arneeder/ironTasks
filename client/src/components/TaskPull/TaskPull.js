import './index.css'
import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { ProjectContext } from '../../context/getProject';
import Multiselect from 'multiselect-react-dropdown';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';

const TaskPull = () => {

    const storedToken = localStorage.getItem('authToken')
    const { setTaskCreate } = useContext(ProjectContext)

    const [myTasks, setMyTasks] = useState([])

    const getUserTasks = () => {
        axios.get('/api/tasks/', { headers: { Authorization: `Bearer ${storedToken}` } } )
            .then( tasks => {
                setMyTasks( () => tasks.data )
            } )
            .catch( err => console.log(err) )
    }
    
    const onMemberSelect = (selectedList, selectedItem) => {
        setMyTasks( () => selectedList )
    }
    const handleSubmit = e => {
        // add tasks to project (in which column?)
        // add projectReferenceSchema to task
    }

    useEffect(() => {
        setTaskCreate( () => false )
        getUserTasks()
    }, [])    

    return (
        <div className='task-pull-container'>
            <header className='header-task-pull'>
                <h2>Select Tasks</h2>
            </header>
            <form className='task-pull-content' onSubmit={handleSubmit}>
                <Multiselect
                    className="task-pull-select"
                    options={myTasks}
                    onSelect={onMemberSelect}
                    displayValue="name"
                    showCheckbox={true}
                />
                <ButtonSubmit 
                    className={"btn-small"}
                    content={'Add To Board'}
                />
            </form>
      </div>
    )
}


export default TaskPull