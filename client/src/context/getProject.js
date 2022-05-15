import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectContext = React.createContext()

const ProjectWrapper = props => {

    const { projectId } = useParams()
    
    const storedToken = localStorage.getItem('authToken')
    
    const [project, setProject] = useState([])
    
    const getProject = () => {
      axios.get(`/api/projects/${projectId}`,  { headers: { Authorization: `Bearer ${storedToken}` } } )
          .then( project => {
            setProject(() => project.data)
          })
          .catch(error => console.log(error))
    }

    return(
        <ProjectContext.Provider value={{ project, setProject,  getProject }}>
			{props.children}
		</ProjectContext.Provider>
    )
}


export { ProjectContext, ProjectWrapper }

