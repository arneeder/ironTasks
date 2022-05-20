import './index.css'
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';


const Navbar = () => {
	const { isLoggedIn, logoutUser } = useContext(AuthContext)

	return (
		<nav className='navbar'>

			<div className='nav-button-list'>
            {isLoggedIn ?
				(
					<>
						<Link to='/main'>
							<p className='navbar-link'>My Projects</p>
						</Link>
                        <Link to='/login'>
						    <p className='navbar-link' onClick={logoutUser}>Log out</p>
                        </Link>
					</>
				) : (
					<>
						<Link to='/signup'>
							<p className='navbar-link'>Signup</p>
						</Link>
						<Link to='/login'>
							<p className='navbar-link'>Login</p>
						</Link>
					</>
				)
			}
            </div>
		</nav>
	)
}

export default Navbar