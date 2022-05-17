import './index.css'
import React from 'react'
import ButtonRound from '../ButtonRound/ButtonRound'

const Popup = props => {

    return ( (props.trigger) ? (
        <div className='popup'>
            <ButtonRound className='btn-close'>X</ButtonRound>
            <div className="popup-inner">
                { props.children }
            </div>
        </div>
  ) : ''
  )
}

export default Popup