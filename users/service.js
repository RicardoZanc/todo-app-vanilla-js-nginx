import { readDb } from '../db/service-db.js'

async function getUsers(user){
    const users = await readDb();
    if(!users || users.length == 0){
        return 'Não há usuários ainda'
    }

    console.log(users)

    const cleanedUsers = users.map(user=>{
        if(user.tasks){
            delete user.tasks
            return user
        }
        return user
    })

    console.log('\n\n\nCleaned users: ', cleanedUsers)
    
    return cleanedUsers;
}

async function userExists(email){
    const users = await readDb()
    const existingUser = users.find(user => user.email == email)
    return !!existingUser;
}

export {
    getUsers,
    userExists
}