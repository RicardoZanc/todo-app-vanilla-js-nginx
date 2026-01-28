import { Router } from 'express'
import { auth } from '../auth/authMiddleware.js'
import { getUsers, createUser, login } from './service.js'

const router = Router()

router.get('/users', auth, async (req, res)=>{
    const users = await getUsers()
    res.status(200).send(users)
})

router.post('/create-account', async (req, res)=>{
    const user = req.body;

    try{
        await createUser(user);
        return res.status(201).send({success: true, created_user: user})
    }catch(e){
        return res.status(406).send({success: false, error: e.message});
    }
})

router.post('/login', async (req, res)=>{
    const user = req.body;
    try{
        const userEmail = await login(user)
        return res.status(200).send({
            logged: true,
            email: userEmail
        })
    }catch(e){
        return res.status(406).send({
            logged: false,
            error: e.message
        })
    }
})

export default router;