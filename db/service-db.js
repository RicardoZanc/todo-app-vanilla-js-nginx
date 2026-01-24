import fs from 'node:fs/promises'
const db = './db/db.json'

async function readDb(){
    const data = await fs.readFile(db);
    const object = await JSON.parse(data.toString())
    return object
}

async function writeOnDb(data){
    const writableData = JSON.stringify(data);
    await fs.writeFile(db, writableData)
}

export {
    readDb,
    writeOnDb
}