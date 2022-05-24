import './index.css'
import React, { useContext, useState } from 'react';
import axios from 'axios';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import { AuthContext } from '../../context/auth';

const ProjectCreate = props => {

    const { user } = useContext(AuthContext)
    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const storedToken = localStorage.getItem('authToken')
    
    const handleSubmit = e => {
        e.preventDefault()
        axios.post('/api/projects/', {name, description}, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( project => {
                setName(() => '')
                setDescription(() => '')
                axios.get(`/api/users/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
                    .then( userFromDb => {
                        userFromDb.data.projects.push( project.data._id )
                        console.log(userFromDb.data);
                            axios.put(`/api/users/${user._id}`, userFromDb.data, { headers: { Authorization: `Bearer ${storedToken}` } } )
                                .then( updatedUser => {
                                    props.getMyProjects()
                                })
                                .catch( err => console.log(err) )
                    })
                    .catch( err => console.log(err) )
            })
            .catch(err => console.log(err))
    }
    const handleName = e => setName( () => e.target.value)
    const handleDescription = e => setDescription( () => e.target.value)
  
    return (
        <div className='project-create-container'>
            <h2>Create new Project...</h2>
            <form className='project-create-form' onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" value={name} onChange={handleName} />

                <label htmlFor="description">Description: </label>
                <input type="text" value={description} onChange={handleDescription} />
                
                <ButtonSubmit className={'primary'} type="submit" content={'Create Content'}/>
            </form>
        </div>
    )
}

export default ProjectCreate