import { Router } from "express";

import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const upload = multer({
	dest: "./tmp",
});

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRouter.use(ensureAuthenticated);

// Create
categoriesRouter.post("/", createCategoryController.handle);

// List categories
categoriesRouter.get("/", listCategoriesController.handle);

// Import categories
categoriesRouter.post("/import", upload.single("file"), importCategoryController.handle);

export { categoriesRouter };
