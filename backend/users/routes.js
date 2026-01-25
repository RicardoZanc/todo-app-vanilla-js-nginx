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
    if(!user){
        return res.status(400).send('User information required');
    }

    try{
        await createUser(user);
        return res.status(201).send({Created_user: user})
    }catch(e){
        console.log('Error: ', e.message)
        return res.status(406).send({Error: e.message});
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