import app from "./app";
import {Server} from 'http'

let server:Server

async function bootstrap(){
    try {
        server = app.listen(8000,()=>{
            console.log("Listening to the port 8000")
        })
    } catch (error) {
        console.log(error)
    }
}

bootstrap()