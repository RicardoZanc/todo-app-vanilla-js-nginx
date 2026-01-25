import { userExists } from "../users/service.js"

export async function auth(req, res, next){
    const email = req.headers.auth

    if(!email){
        return res.sendStatus(401)
    }
    
    const existingUser = await userExists(email)
    if (!existingUser){
        return res.sendStatus(401)
    }

    next()
}