import { Router } from "express";

import multer from "multer";

const upload = multer({
	dest: "./tmp",
});

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRouter = Router();

//create category
categoriesRouter.post("/", (request, response) => {
	createCategoryController.handle(request, response);
});

//list categories
categoriesRouter.get("/", (request, response) => {
	listCategoriesController.handle(request, response);
});

//Import categories
categoriesRouter.post("/import", upload.single("file"), (request, response) => {
	importCategoryController.handle(request, response);
});

export { categoriesRouter };
