import { Request, Response} from 'express'
import prismaClient from '../prisma'
import { GetLast3MessagesService } from '../services/GetLast3MessagesService'



class GetLast3MessagesContreller{
    async hendle(request: Request, response: Response){
        const service = new GetLast3MessagesService()

        const result = await service.execute()
    
       return response.json(result)
    }
}

export { GetLast3MessagesContreller }