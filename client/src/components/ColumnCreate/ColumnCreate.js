import React from 'react';
import './index.css';
import Multiselect from 'multiselect-react-dropdown';

const ColumnCreate = () => {

    const onMemberSelect = () => {
        console.log('select handler')
    }
    const onSubmitHandler = () => {
        console.log('submit handler')
    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            <label>Status Name: </label>
            <input className='staus-name-input' type="text" />

            <label>Status Type: </label>
            <Multiselect
                    options={ [
                        { id: 0, name: 'not started' },
                        { id: 1, name: 'in progress' },
                        { id: 2, name: 'completed' }
                    ] }
                    onSelect={onMemberSelect}
                    displayValue="name"
                    singleSelect={true}
                    className='staus-name-input'
                />
        </form>
    )
}

export default ColumnCreate