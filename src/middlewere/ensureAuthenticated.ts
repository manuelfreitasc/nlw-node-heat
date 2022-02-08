import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'


interface Ipyload{
    sub: string
}

export function ensureAthonticated(request: Request, response: Response, next: NextFunction){
      const  authToken = request.headers.authorization

      if(!authToken){
          return response.status(401).json({ errorCode : "Token.Invalido!" })
          
      }


      const [, token] = authToken.split(" ")

      try {
          const {sub} = verify(token, process.env.JWT_SECRET) as Ipyload
          
          request.user_id = sub 

          next()

      } catch (error) {
          return response.status(401).json({errorCode : "Token.Expirado!"})
      }
}