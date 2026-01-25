import { readDb, writeOnDb } from '../db/service-db.js'

async function getUsers(){
    const users = await readDb();
    if(!users || users.length == 0){
        return 'Não há usuários ainda'
    }

    const cleanedUsers = users.map(user=>{
        if(user.tasks){
            delete user.tasks
            return user
        }
        return user
    })    
    return cleanedUsers;
}

async function createUser(user){

    if(!user.email || !user.password || !user.name){
        throw new Error('Must have name, email and password')
    }

    const existingUser = await userExists(user.email);

    if(existingUser){
        throw new Error("There's already a user with this email")
    }

    const users = await readDb();

    let newUserId = 0; 

    if(users.length){
        newUserId = users[users.length-1].id + 1
    }
    

    users.push({
        id: newUserId,
        ...user
    });
    await writeOnDb(users)
}

async function login(user){

    if(!user.email || !user.password){
        throw new Error('Password and Email required');
    }

    const users = await readDb();
    const authUser = users.find(u => u.email == user.email && u.password == user.password);
    if(!authUser){
        throw new Error('Password or Email incorrect')
    }
    return authUser.email

}

async function userExists(email){
    const users = await readDb()
    const existingUser = users.find(user => user.email == email)
    return !!existingUser;
}

export {
    getUsers,
    createUser,
    userExists,
    login
}