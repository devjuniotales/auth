import {Request, Response} from 'express'
import {getRepository} from 'typeorm'

class DashController {
    async create( req : Request, res : Response) {

        const userId = req.userId;

        return res.send({userId : userId})

    }

}
export default new DashController();
