import './index.css';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import ButtonSubmit from '../../components/ButtonSubmit/ButtonSubmit';


const Login = () => {
  const navigate = useNavigate()
  const { storeToken, verifyStoredToken } = useContext(AuthContext)
  
  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // handle functions
  const handleSubmit = e => {
    e.preventDefault()
    const requestBody = { email, password }
    console.log(requestBody);

    axios.post('/api/auth/login', requestBody)
      .then( response => {
        const token = response.data.authToken
        storeToken(token)
        verifyStoredToken()
          .then(() => {
            navigate('/main')
          })
          .catch( err => console.log(err) )
      })
      .catch( err => console.log(err) )
  }
  
  return (
    <div className="container">
        <form className="signup-container" onSubmit={handleSubmit}>
        
            <div className="label-input">
                <input className="signup-element" type="text" placeholder="Email" value={email} onChange={ e => setEmail(() => e.target.value) } />
            </div>

            <div className="label-input">
                <input className="signup-element" type="password" placeholder="Password" value={password} onChange={ e => setPassword(() => e.target.value) } />
            </div>

            <ButtonSubmit 
                className={'primary'}
                content={'Signup'}
            />

        </form>
    </div>
  )
}

export default Login