import './index.css';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../context/getProject';

const ProjectEdit = () => {
    
    const { project } = useContext(ProjectContext)
    const storedToken = localStorage.getItem('authToken')


    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [optionTags, setOptionTags] = useState([])

    const handleSubmit = () => {
        console.log('handle submit');
    }
    // const getOptionTags =  async () => {
    //     await getProjectUsers(project._id)
    //     await getAllUsers()
    //     console.log(allUsers);
    //     console.log(projectUsers);
    //     const tagList = allUsers.map( user => {
    //         if (projectUsers.includes( user )) {
    //             return `<option value=${user._id} selected >${user.name}</option>`
    //         } else {
    //             return `<option value=${user._id} >${user.name}</option>`
    //         }
    //     })
    //     setOptionTags( () => tagList )
    // }

    const getOptionTags = projectId => {
        
        const optionTagList = []
        
        axios.get('api/users', { headers: { Authorization: `Bearer ${storedToken}` } })
        .then( allUsers => {
            axios.get(`api/users/project/${projectId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then( projectUsers => {
                    // console.log(allUsers);
                    // console.log(projectUsers);
                    allUsers.data.forEach( user => {
                        optionTagList.push((<option value={user._id} >{user.name}</option>))
                        // if(projectUsers.find( projectUser => projectUser._id  === user._id )) {
                        //     optionTags.push(`<option value=${user._id} >${user.name}</option>`)
                        // } else {
                        //     optionTags.push(`<option value=${user._id} >${user.name}</option>`)
                        // }
                    })
                } )
                .catch( err => console.log(err) )
        } )
        .catch( err => console.log(err) )

        setOptionTags(() => optionTagList)
    }

    useEffect(() => {
        console.log('Use Effect of User Context')
        console.log('Project ID: ', project._id);
        getOptionTags(project._id)
    }, [])

    console.log('Option Tags: ', optionTags);
    
    return (
        <>
            <h1>Edit Project</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" value={name} onChange={e => setName( () => e.target.value)} />

                <label htmlFor="description">Description: </label>
                <input type="text" value={description} onChange={e => setDescription( () => e.target.value)} />

                <label htmlFor="members">Description: </label>     
                <select  id="members">
                    {optionTags}
                </select>
                
                <button type="submit">Create Task</button>
            </form>
    </>
  )
}

export default ProjectEdit