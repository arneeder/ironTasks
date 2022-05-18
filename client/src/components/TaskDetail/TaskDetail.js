import './index.css';
import Multiselect from 'multiselect-react-dropdown';
import React, { useContext, useState, useEffect } from 'react';
import { ProjectContext } from '../../context/getProject';

const TaskDetail = props => {

    const { currentTask, projectMembers, getProject } = useContext(ProjectContext)
    
    const [project, setProject] = useState({})
    const [personsInProject, setPersonsInProject] = useState([])
    const [accountableState, setAccountableState] = useState({})
    const [responsibleState, setResponsibleState] = useState({})

    const onAccountableSelect = (selectedList, selectedItem) => setAccountableState( () => selectedItem )
    const onResponsibleSelect = (selectedList, selectedItem) => setResponsibleState( () => selectedItem )

    useEffect( () => {
        getProject( props.projectId, setProject)
        const members = []
        projectMembers.forEach( projectMember => {
            members.push({
                id: projectMember._id,
                name: projectMember.name
            })
        })
        setPersonsInProject( () => members)
        setAccountableState( () => { 
            const accountable = { 
                id: currentTask.accountable?._id,
                name: currentTask.accountable?.name
            }
            console.log(currentTask);
            return accountable
        } )
        setResponsibleState( () => { 
            const responsible = { 
                id: currentTask.responsible?._id,
                name: currentTask.responsible?.name
            }
            return responsible
        } )
    }, [])

    console.log({projectMembers});
    return (
        <>
            <div className='task-detail-container'>
                <header>
                    <h2>{currentTask.name}</h2>
                </header>
                <article>
                    <h4>Details: </h4>
                    <p>{ currentTask.description }</p>
                </article>
                <article>
                    <h4>Accountable: </h4>
                    <Multiselect
                        options={personsInProject}
                        selectedValues={ accountableState }
                        onSelect={onAccountableSelect}
                        displayValue="name"
                        singleSelect={true}
                        placeholder={ accountableState.name }
                    />
                </article>
                <article>
                    <h4>Responsible: </h4>
                    <Multiselect
                        options={personsInProject}
                        selectedValues={ responsibleState }
                        onSelect={onResponsibleSelect}
                        displayValue="name"
                        singleSelect={true}
                        placeholder={ responsibleState.name }
                    />
                </article>
            </div>
        </>
    )
}

export default TaskDetail