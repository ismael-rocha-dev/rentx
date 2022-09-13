import { Router } from "express";
import { authenticateUserRouter } from "./authenticateUser.routes";
import { categoriesRouter } from "./categories.routes";
import { specificationsRouter } from "./specifications.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRouter);
router.use("/specifications", specificationsRouter);
router.use("/users", usersRouter);
router.use(authenticateUserRouter);

export { router };
