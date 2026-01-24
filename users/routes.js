import { Router } from 'express'
import { auth } from '../auth/authMiddleware.js'
import { getUsers } from './service.js'

const router = Router()

router.get('/users', auth, async (req, res)=>{
    const users = await getUsers()
    res.status(200).send(users)
})

router.post('/create-account', async (req, res)=>{

})

export default router;