import { login } from "./users/service.js";


const result = await login({
    email: 'jorgin@emailer.com'
})

console.log(result)