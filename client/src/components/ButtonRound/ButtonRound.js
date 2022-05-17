import './index.css';
import React, { useContext } from 'react';
import ProjectContext from '../../context/getProject';

const ButtonRound = props => {
  
    const { popup, setPopup } = useContext(ProjectContext)
  
    return (
    <button type='button' className='btn' onClick={ () => setPopup(!popup)}>
        { props.children }
    </button>
  )
}

export default ButtonRound