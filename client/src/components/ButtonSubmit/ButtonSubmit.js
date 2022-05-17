import './index.css';
import React from 'react';

const ButtonSubmit = props => {

    return (
        <button type={props.type ? props.type : 'submit'} className={props.className}>
            { props.content }
        </button>
  )
}

export default ButtonSubmit