import './index.css'
import React, { useContext, useState } from 'react'
import { ProjectContext } from '../../context/getProject'

const ProjectEdit = () => {
    
    const { project } = useContext(ProjectContext)

    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [members, setMembers] = useState(project.members)

    const handleSubmit = () => {
        console.log('handle submit');
    }
    
    return (
        <>
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" value={name} onChange={e => setName( () => e.target.value)} />

                <label htmlFor="description">Description: </label>
                <input type="text" value={description} onChange={e => setDescription( () => e.target.value)} />

                <label htmlFor="members">Description: </label>     
                <select  id="members">
                    {
                        members.map( member => (
                            <option value={member._id} >{member.name}</option>
                        ))
                    }
                </select>        
                
                <button type="submit">Create Task</button>
            </form>
    </>
  )
}

export default ProjectEdit