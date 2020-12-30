import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import User from '../models/User'

class UserController {
    async create( req : Request, res : Response) {
        const {email, password} = req.body;
        const repository = getRepository(User);

        const userExists = await repository.findOne({ where : {email}})

        if(userExists) {
            res.status(409).send('Email já cadastrado!')
        }

        const user = repository.create({
            email,
            password
        })
        await repository.save(user)

        return res.json(user)

    }

}
export default new UserController();
