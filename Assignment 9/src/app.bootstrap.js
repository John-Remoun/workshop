
import { NODE_ENV, port } from '../config/config.service.js'
import { authentcateDB } from './DB/connection.db.js'
import { authRouter } from './modules/auth/index.js'
import { userRouter } from './modules/user/index.js'
import { noteRouter } from './modules/note/index.js'
import express from 'express'

async function bootstrap() {
    const app = express()
    //convert buffer data
    app.use(express.json())
    //database connection
    await authentcateDB()
    //application routing
    app.get('/', (req, res) => res.send('Hello you are in righ server !'))
    app.use('/auth', authRouter)
    app.use('/users', userRouter)
    app.use('/notes', noteRouter) 


    //invalid routing
    app.use('{/*dummy}', (req, res) => {
        return res.status(404).json({ message: "Invalid application routing" })
    })

    //error-handling
    app.use((error, req, res, next) => {
        const status = error.cause?.status ?? 500
        return res.status(status).json({
            error_message:
                status == 500 ? 'something went wrong' : error.message ?? 'something went wrong',
            stack: NODE_ENV == "development" ? error.stack : undefined
        })
    })
    
    app.listen(port, () => console.log(`Example app listening on port ${port} 🚀`))
}
export default bootstrap