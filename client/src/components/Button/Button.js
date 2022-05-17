import './index.css';
import React, { useContext } from 'react';
import ProjectContext from '../../context/getProject';

const ButtonRound = props => {

    const { setCurrentTaskId } = useContext(ProjectContext)

    const handleButton = () => {
        props.setTrigger(!props.trigger)
        if(props.taskId) setCurrentTaskId(() => props.taskId)
    }

    return (
        <button type='button' className={props.className} onClick={handleButton}>
            { props.content }
        </button>
  )
}

export default ButtonRound