import prismaClient from "../prisma"



class GetLast3MessagesService{
   async execute(){
     const message = prismaClient.message.findMany({
         take: 3,
         orderBy:{
             create_t: "desc",
         },
         include: {
             user: true
         }
     })

     return message
   }
}

export { GetLast3MessagesService
 }