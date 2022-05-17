import './index.css';
import React, { useContext } from 'react';
import ProjectContext from '../../context/getProject';

const ButtonRound = props => {

    const { getCurrentTask } = useContext(ProjectContext)

    const handleButton = () => {
        props.setTrigger(!props.trigger)
        console.log('BTN PARAMETER: ', props.taskId);
        if(props.taskId) getCurrentTask( props.taskId )
    }

    return (
        <button type='button' className={props.className} onClick={handleButton}>
            { props.content }
        </button>
  )
}

export default ButtonRound