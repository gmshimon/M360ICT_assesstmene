const registerUserQuery:string = "INSERT INTO users (name,email,pass,age) VALUES ($1,$2,$3,$4)"
const loginUserQuery:string = "SELECT * FROM users WHERE email = $1";
export default {
    registerUserQuery,
    loginUserQuery
}