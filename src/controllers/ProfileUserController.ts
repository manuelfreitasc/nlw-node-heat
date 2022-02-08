import { Request, Response} from 'express'
import prismaClient from '../prisma'
import { ProfileUserService } from '../services/ProfileUserService'



class ProfileUserContreller{
    async hendle(request: Request, response: Response){
        const { user_id } = request

        const service = new ProfileUserService()

        const result = await service.execute(user_id)
    
       return response.json(result)
    }
}

export { ProfileUserContreller }