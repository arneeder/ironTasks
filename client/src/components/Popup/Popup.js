import './index.css'
import React from 'react'
import Button from '../Button/Button'

const Popup = props => {
    
    return ( (props.trigger) ? (
        <div className='popup'>
            <Button
                className={'btn-close'}
                content={'X'}
                trigger={props.trigger}
                setTrigger={props.setTrigger}
            />
            <div className="popup-inner">
                { props.children }
            </div>
        </div>
  ) : ''
  )
}

export default Popup