import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationsController } from "../modules/cars/useCases/createSpecification/CreateSpecificationsController";

const specificationsRouter = Router();

const createSpecificationsController = new CreateSpecificationsController();

specificationsRouter.use(ensureAuthenticated);

// Create
specificationsRouter.post("/", createSpecificationsController.handle);

// List

// Update

export { specificationsRouter };
