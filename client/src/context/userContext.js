import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ProjectContext } from '../context/getProject';

const UserContext = React.createContext()



const UserWrapper = props => {

    const { project } = useContext(ProjectContext)


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

        console.log(optionTagList);
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
