import React, { useState } from 'react';
import axios from 'axios';

const ProjectContext = React.createContext()

function ProjectProviderWrapper(props) {
    
    const storedToken = localStorage.getItem('authToken')
    
    const [project, setProject] = useState([])
    const [availableStatusses, setAvailableStatusses] = useState([])
    const [projectMembers, setProjectMembers] = useState([])
    
    const getProject = projectId => {
      axios.get(`/api/projects/${projectId}`,  { headers: { Authorization: `Bearer ${storedToken}` } } )
          .then( project => {
            console.log('projectFromApiCall: ', project.data);
            const availableStatusses = []
            project.data.tasksByStatus.forEach(statusWithTasks => {
                availableStatusses.push(statusWithTasks.status)
            })
            const projectMembers = []
            project.data.members.forEach(projectMember => {
                projectMembers.push(projectMember)
            })
            setProjectMembers (() => projectMembers)
            setAvailableStatusses(() => availableStatusses)
            setProject(() => project.data)
          })
          .catch(error => console.log(error))
    }

    return(
        <ProjectContext.Provider value={{ getProject, project, setProject, availableStatusses, projectMembers }}>
			{props.children}
		</ProjectContext.Provider>
    )
}


export { ProjectContext, ProjectProviderWrapper }

