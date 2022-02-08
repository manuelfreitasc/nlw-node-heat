import { Router } from "express";
import { AuthorizetUserController } from "./controllers/AuthorizeteUserContriller";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessagesContreller } from "./controllers/GetLast3MessagesContreller";
import { ProfileUserContreller } from "./controllers/ProfileUserController";
import { ensureAthonticated } from "./middlewere/ensureAuthenticated";


const router = Router()


router.post("/authenticate", new AuthorizetUserController().hendle)

router.post("/messages", ensureAthonticated , new CreateMessageController().hendle)
router.get("/messages/last3", new GetLast3MessagesContreller().hendle)

router.get("/profile", ensureAthonticated, new ProfileUserContreller().hendle)

export {router}