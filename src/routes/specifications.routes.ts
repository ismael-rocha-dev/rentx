import { Router } from "express";
import { createSpecificationsController } from "../modules/cars/useCases/createSpecification";

const specificationsRouter = Router();

//create specification
specificationsRouter.post("/create", (request, response) => createSpecificationsController.handle(request, response));

export { specificationsRouter };
