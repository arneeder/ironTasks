import React, { useState } from 'react';
import axios from 'axios';

const UserContext = React.createContext()

const UserWrapper = props => {

    const storedToken = localStorage.getItem('authToken')
    
    const [allUsers, setAllUsers] = useState([])
    const [projectUsers, setProjectUsers] = useState([])

    const getAllUsers = () => {
        axios.get('api/users', { headers: { Authorization: `Bearer ${storedToken}` } })
            .then( users => setAllUsers( () => users ) )
            .catch( err => console.log(err) )
    }
    const getProjectUsers = projectId => {
        axios.get(`api/users/${projectId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then( users => setProjectUsers( () => users ) )
        .catch( err => console.log(err) )
    }

    return(
        <UserContext.Provider
            value={{
                allUsers,
                setAllUsers,
                projectUsers,
                setProjectUsers,
                getAllUsers,
                getProjectUsers
                }}>
			{props.children}
		</UserContext.Provider>
    )
}

export { UserContext, UserWrapper }
