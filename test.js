import { readDb, writeOnDb } from "./db/service-db.js";

const object = await readDb();

object.push({Name: "Teste"})

await writeOnDb(object)