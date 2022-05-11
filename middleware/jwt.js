
const { expressjwt: jwt } = require("express-jwt");

const getTokenFromHeaders = req => {
	console.log('Request Headers: ',req.headers);
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		const token = req.headers.authorization.split(' ')[1]
		return token
	}
	return null
}

const isAuthenticated = jwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
	requestProperty: 'payload',
	getToken: getTokenFromHeaders
})

module.exports = {
	isAuthenticated
}