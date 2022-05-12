import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const CreateTask = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [accountable, setAccountable] = useState('')
    const [responsible, setResponsible] = useState('')
    
    const handleSubmit = () => {
        //todo
    }
    const handleName = e => setName(() => e.target.value)
    const handleDescription = e => setDescription(() => e.target.value)
    const handleAccountable = e => setAccountable(() => e.target.value)
    const handleResponsible = e => setResponsible(() => e.target.value)
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" value={name} onChange={handleName} />

                <label htmlFor="description">Description: </label>
                <input type="text" value={description} onChange={handleDescription} />

                <label htmlFor="accountable">Accountable: </label>
                <select value={accountable} onChange={handleAccountable} >
                    <option>die option tags müssen aus map über props kommen</option>
                </select>

                <label htmlFor="responsible">Responsible: </label>
                <select value={responsible} onChange={handleResponsible}>
                    <option>die option tags müssen aus map über props kommen</option>
                </select>

                <Button variant="primary" type="submit"></Button>
            </form>
        </>
  )
}

export default CreateTask