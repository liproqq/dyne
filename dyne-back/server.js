const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser');

const routes = require('./api/apiroutes');
const authRoutes = require('./api/auth');
const port = process.env.PORT || 3030;
const expressJwt = require('express-jwt');

// pass as middleware for auth-guarded routes
const checkIfAuthenticated = expressJwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ['HS256']
}); 

app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

app.use('/api/', routes)
app.use('/auth/', authRoutes)

app.get('*', (req, res) => {
  res.status(404).send('Not found')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})