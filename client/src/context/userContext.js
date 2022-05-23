import React, { useState } from 'react';
import axios from 'axios';

const UserContext = React.createContext()



const UserWrapper = props => {

    const storedToken = localStorage.getItem('authToken')
    
    const [allUsers, setAllUsers] = useState([])
    const [projectUsers, setProjectUsers] = useState([])
    const [optionTags, setOptionTags] = useState([])

    const getAllUsers = () => {
        axios.get('api/users', { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( users => setAllUsers( () => users.data ) )
            .catch( err => console.log(err) )
    }
    const getProjectUsers = projectId => {
        axios.get(`api/users/project/${projectId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( users => setProjectUsers( () => users.data ) )
            .catch( err => console.log(err) )
    }
    const getOptionTags = projectId => {
        
        const optionTagList = []
        
        axios.get('api/users', { headers: { Authorization: `Bearer ${storedToken}` } })
        .then( allUsers => {
            axios.get(`api/users/project/${projectId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then( projectUsers => {
                    allUsers.data.forEach( user => {
                        optionTagList.push((<option value={user._id} >{user.name}</option>))
                    })
                } )
                .catch( err => console.log(err) )
        } )
        .catch( err => console.log(err) )

        setOptionTags(() => optionTagList)
    }

    return(
        <UserContext.Provider
            value={{
                allUsers,
                setAllUsers,
                projectUsers,
                setProjectUsers,
                getAllUsers,
                getProjectUsers,
                getOptionTags,
                optionTags
                }}>
			{props.children}
		</UserContext.Provider>
    )
}

export { UserContext, UserWrapper }
