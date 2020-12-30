import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const AuthConfig = require ('../config/auth.json')

interface Users{
    id: string;
    email: string;
    password: string;
}

class AuthController {
    async authenticate( req : Request, res : Response) {
        const {email, password} = req.body;

        const repository = getRepository(User);

        const user = await repository.findOne({ where : {email}}) as Users

        if(!user) {
            res.status(401).send('Email não registrado!')
        }

        const isValidPassword = await bcrypt.compareSync(password, user.password)

        if(!isValidPassword){
            res.status(401).send('Usúario ou senha Inválido!')
        }

        const token = jwt.sign({id: user.id}, AuthConfig.secret ,{expiresIn : '1d'})

        delete user.password;

        res.json({
            user,
            token
        })

    }

}
export default new AuthController();
