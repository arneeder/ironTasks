import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth';


const Login = () => {
  const navigate = useNavigate()
  const { storeToken, verifyStoredToken } = useContext(AuthContext)
  
  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // handle functions
  const handleSubmit = e => {
    e.preventDefault()
    const requestBody = {email, password}
    console.log(requestBody);

    axios.post('/api/auth/login', requestBody)
      .then( response => {
        console.log({response});
        const token = response.data.authToken
        storeToken(token)
        verifyStoredToken()
          .then(() => {
            navigate('/')
          })

      })
      .catch()
  }
  const handleEmail = e => setEmail(() => e.target.value)
  const handlePassword = e => setPassword(() => e.target.value)
  
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input type="text" value={email} onChange={handleEmail} />

        <label htmlFor="password">Password: </label>
        <input type="password" value={password} onChange={handlePassword} />

        <button type="submit">Log In</button>
      </form>
    </>
  )
}

export default Login