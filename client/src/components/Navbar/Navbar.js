import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth'

const Navbar = () => {
	const { isLoggedIn, logoutUser } = useContext(AuthContext)

	return (
		<nav>
			<Link to='/'>
				<button>Home</button>
			</Link>
			{isLoggedIn ?
				(
					<>
						<Link to='/main'>
							<button>My Projects</button>
						</Link>
						<button onClick={logoutUser}>Log out</button>
					</>
				) : (
					<>
						<Link to='/signup'>
							<button>Signup</button>
						</Link>
						<Link to='/login'>
							<button>Login</button>
						</Link>
					</>
				)
			}
		</nav>
	)
}

export default Navbar