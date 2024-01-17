import jwt  from "jsonwebtoken";
import { IUser } from '../Modules/User/User.interface';

interface IPayload{
    id:string|undefined,
    email:string
}

const generateToken = (userInfo:IUser) =>{
    const playLoad:IPayload = {
        id: userInfo.id,
        email: userInfo.email
    }

    const token = jwt.sign(playLoad,process.env.TOKEN_SECRET as string,{
        expiresIn:'10000000000s'
    })
    return token
}

export default generateToken