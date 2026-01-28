import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './users/routes.js'
import taskRouter from './tasks/routes.js'
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

app.get('/', (req, res)=>{
 res.send('ok')
})

app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, ()=>{
    console.log('Server running on: ', PORT)
})


