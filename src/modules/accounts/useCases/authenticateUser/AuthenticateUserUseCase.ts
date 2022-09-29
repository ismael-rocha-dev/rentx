import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		email: string;
		name: string;
	};
	token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}
	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError("Incorrect email or password");
		}

		const isPasswordCorrect = await compare(password, user.password);

		if (!isPasswordCorrect) {
			throw new AppError("Incorrect email or password");
		}

		const token = sign({}, "359be0e01e8a8a59b65007f99523fcc600ea783f", {
			subject: user.id,
			expiresIn: "1d",
		});

		return {
			user: {
				email: user.email,
				name: user.name,
			},
			token,
		};
	}
}

export { AuthenticateUserUseCase };
