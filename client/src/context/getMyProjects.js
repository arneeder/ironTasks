import React, { useState } from 'react';
import axios from 'axios';

const MyProjectsContext = React.createContext()

const MyProjectsWrapper = props => {

    const storedToken = localStorage.getItem('authToken')
    
    const [myProjects, setMyProjects] = useState([])
    
    const getMyProjects = () => {
      axios.get('/api/projects/',  { headers: { Authorization: `Bearer ${storedToken}` } } )
          .then( myProjects => {
            setMyProjects(() => myProjects.data)
          })
          .catch(error => console.log(error))
    }

    return(
        <MyProjectsContext.Provider value={{ myProjects, setMyProjects,  getMyProjects }}>
			{props.children}
		</MyProjectsContext.Provider>
    )
}


export { MyProjectsContext, MyProjectsWrapper }

