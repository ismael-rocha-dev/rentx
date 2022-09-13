import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
	sub: string;
}

const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError("no token was provided", 401);
	}

	const [, token] = authHeader.split(" ");

	try {
		const { sub: user_id } = verify(token, "359be0e01e8a8a59b65007f99523fcc600ea783f") as IPayload;

		const usersRepository = new UsersRepository();

		const user = await usersRepository.findById(user_id);

		if (!user) {
			throw new AppError("User do not exists!", 401);
		}

		request.user = {
			id: user_id,
		};

		next();
	} catch (error) {
		throw new AppError("Invalid token!", 401);
	}
};

export { ensureAuthenticated };
