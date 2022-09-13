import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateUserRouter = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateUserRouter.post("/sessions", authenticateUserController.handle);

export { authenticateUserRouter };
