import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute({ name, email, password, driver_license }): Promise<void> {
		const emailAlreadyExists = await this.usersRepository.findByEmail(email);

		if (emailAlreadyExists) {
			throw new AppError("Email already taken");
		}

		password = await hash(password, 10);

		await this.usersRepository.create({ name, email, password, driver_license });
	}
}

export { CreateUserUseCase };
