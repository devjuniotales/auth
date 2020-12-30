import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

const authConfig = require('../config/auth.json')

export default function authMiddleware(req : Request, res: Response, next : NextFunction) {
    const { authorization }= req.headers;

    if(!authorization){
        return res.send('token inválido!')
    }

    const token = authorization.replace('Bearer', '').trim() 

    try {
        const data = jwt.verify(token,authConfig.secret)

        const {id} = data as TokenPayload;

        req.userId = id;

        return next();
        
    } catch (error) {
       return res.status(401)
    }
}