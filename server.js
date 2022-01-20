/**import des modules */
const express = require('express')
const cors = require('cors')
const db = require('./db.config')
const checkTokenMiddleware = require('./jsonwebtoken/check')

/**initialistion de l'api */
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/**import des modules de routage */
const cocktailRouter = require('./routes/cocktails')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')

/**mise en place du routage */
app.get('/', (req, res) => {res.send(`ok!`)})
app.use('/cocktails', cocktailRouter)
app.use('/users', checkTokenMiddleware, userRouter)
app.use('/auth', authRouter)
app.get('*', (req, res) => {res.status(501).send(`-_-"`)})

/**démarage du serveur */
db.authenticate().then(()=>{
    console.log('Database connection OK')
}).then(()=>{
    app.listen(process.env.API_PORT, () => {
        console.log(`This server is running on port ${process.env.API_PORT}.`)
    })
}).catch(err => console.log('Database error ', err))

