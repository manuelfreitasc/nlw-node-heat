import axios from "axios"
import prismaClient from "../prisma"
import { sign } from 'jsonwebtoken'

/**
 * RECEBER O CODE(STRING)
 * RECUPERAR O ACCESS_TOKEN NO GITHUB
 * 
 * VERIFICAR SE USER EXISTE NO DB
 *    --- SIM - GERAR TOKEN
 *    --- NÃO - CRIAR E GERAR TOKEN
 * RETORNAR O TOKEN COM AS INFOS DOS USER LOGADO
 * 
 * 
 */

interface IAccessTokenRespose{
    access_token: string
}

interface IUserResponse{
    avatar_url:string,
    login: string,
    name: string,
    id:number
}

class AuthenticateUserService{
    async execute(code: string){
       const url = 'http://github.com/login/oauth/access_token'

       const { data: accessTokenRespose } = await axios.post<IAccessTokenRespose>( url, null, {
         params:{
             client_id: process.env.GITHUB_CLIENT_ID,
             client_secret: process.env.GITHUB_CLIENT_SECRET,
             code,
         },
         headers:{
             Accept: "application/json"
         }
       })

       const response = await axios.get<IUserResponse>("http://api.github.com/user",{
           headers:{
               authorization: `Bearer ${ accessTokenRespose.access_token }`
           }
       })

       const { login,id, avatar_url, name } =  response.data
       let user = await prismaClient.user.findFirst({
           where:{
               github_id: id
           }
       })

       if (!user) {
        user = await prismaClient.user.create({
               data:{
                   github_id: id,
                   login,
                   name,
                   avatar_url,
               }
           })
       }

       const token = sign(
           {
               user:{
                   name: user.name,
                   avatar_url: user.avatar_url,
                   id:user.id
               }
           },
           process.env.JWT_SECRET,
           {
              subject: user.id,
              expiresIn: "1d"
           }
       )

       return { token, user }
    }
}

export { AuthenticateUserService }