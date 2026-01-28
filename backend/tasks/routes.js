
import { Router } from 'express';
import { auth } from '../auth/authMiddleware.js'
import { createTask, getTasks, toggleStatusTask, deleteTask } from './service.js';

const router = Router();

router.get('/tasks', auth, async (req, res)=> {
    const userEmail = req.headers.auth
    try {
        const {tasks, tasksLenght} = await getTasks(userEmail)
        return res.status(200).send({success: true, tasks, tasksLenght})
    }catch(e){
        console.log(e)
        return res.status(406).send({success: false, error: e.message})
    }
})

router.post('/tasks', auth, async (req, res)=>{
    const userEmail = req.headers.auth
    console.log('\n\n\n\n========\n\nreqbody', req.body, "\n\n\n========\n\n")
    const {taskName} = req.body
    try {
        const taskCreated = await createTask(userEmail, taskName)
        return res.status(201).send({success: true, taskCreated})
    }catch(e){
        res.status(406).send({success: false, error: e.message})
    }
})

router.patch('/tasks/:id/toggleStatus', auth, async (req, res)=>{
    const userEmail = req.headers.auth;
    const taskId = req.params.id;
    try {
        const taskUpdated = await toggleStatusTask(userEmail, taskId)
        return res.status(200).send({success: true, taskUpdated})
    }catch(e){
        res.status(406).send({success: false, error: e.message})
    }
})

router.delete('/tasks/:id', auth, async (req, res)=>{
    const userEmail = req.headers.auth;
    const taskId = req.params.id;
    try{
        const deletedTask =  await deleteTask(userEmail, taskId);
        return res.status(200).send({success: true, deletedTask})
    }catch(e){
        return res.status(406).send({success: false, error: e.message})
    }
})

export default router