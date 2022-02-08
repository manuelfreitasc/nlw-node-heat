import { Request, Response} from 'express'
import prismaClient from '../prisma'

import { CreateMessageService } from "../services/CreateMessageService"


class CreateMessageController{
    async hendle(request: Request, response: Response){
        
        const { message } = request.body
        const { user_id } = request


        const service = new CreateMessageService()
        
        const result =  await service.execute(message, user_id)


        return response.json(result)
    }

    async index(request: Request, response: Response){
        const data = await prismaClient.message.findMany({
            include:{user:true}
        })
        
        return response.json(data)
    }
}

export { CreateMessageController }