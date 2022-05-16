import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectContext = React.createContext()

function ProjectProviderWrapper(props) {
    
    const storedToken = localStorage.getItem('authToken')
    
    const [project, setProject] = useState([])
    const [availableStatusses, setAvailableStatusses] = useState([])
    
    const getProject = (projectId) => {
      axios.get(`/api/projects/${projectId}`,  { headers: { Authorization: `Bearer ${storedToken}` } } )
          .then( project => {
            const availableStatusses = []
            project.tasksByStatus.forEach(statusWithTasks => {
                availableStatusses.push(statusWithTasks.status)
            })
            setAvailableStatusses(() => availableStatusses)
            setProject(() => project.data)
          })
          .catch(error => console.log(error))
    }

    return(
        <ProjectContext.Provider value={{ getProject, project, availableStatusses }}>
			{props.children}
		</ProjectContext.Provider>
    )
}


export { ProjectContext, ProjectProviderWrapper }

