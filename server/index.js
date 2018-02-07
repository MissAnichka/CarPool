const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({ db })
const PORT = process.env.Port || 8080
const app = express()
const socketio = require('socket.io')
module.exports = app

if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((user, done) => {
    db.models.user.findById(id)
        .then(user => done(null, user))
        .catch(done)
})

const createApp = () => {
    // all the middleware:

    // logging
    app.use(morgan('dev'))

    // body parsing
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // compression
    app.use(compression())

    // session with passport
    app.use(session({
        secret: process.env.SESSION_SECRET || 'my best friend is Cody',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    // auth & api routes
    app.use('/auth', require('./auth'))
    app.use('/api', require('./api'))

    // static file serving
    app.use(express.static(path.join(__dirname, '..', 'public')))

    // any remaining requests with an extension (.js, .css, etc) send 404 error
    app.use((req, res, next) => {
        if (path.extname(req.path).length) {
            const err = new Error('Nope. Not found')
            err.status = 404
            next(err)
        } else {
            next()
        }
    })

    // send index.html
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public/index.html'))
    })

    // error handling endware
    app.use((err, req, res, next) => {
        console.error(err)
        console.error(err.stack)
        res.status(err.status || 500).send(err.message || 'Whoops. Internal server error.')
    })
}

const startListening = () => {
    // start listening and create a server object
    const server = app.listen(Port, () => console.log(`Making things happen on port ${PORT}`))

    // set up the socket control center
    const io = socketio(server)
    require('./socket')(io)
}

const syncDB = () => db.sync()

// will evaluate to false if this module is required by another module, ie for testing
if (require.main === module) {
    sessionStore.sync()
        .then(syncDB)
        .then(createApp)
        .then(startListening)
} else {
    createApp()
}
