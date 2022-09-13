import { AppError } from "../../../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/usersRepositoryInMemory";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
	});

	it("should be able to authenticate user", async () => {
		const user_data: ICreateUserDTO = {
			name: "ismael",
			email: "ism@gmail.com",
			password: "123456",
			driver_license: "32432342",
		};

		await createUserUseCase.execute(user_data);

		const response = await authenticateUserUseCase.execute({
			email: user_data.email,
			password: user_data.password,
		});

		expect(response).toHaveProperty("token");
	});

	it("should not be able to authenticate a noexistent user", () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: "email@domain.com",
				password: "09876524",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to authenticate with incorrect password", () => {
		expect(async () => {
			const user = {
				name: "ismael",
				email: "ism@gmail.com",
				password: "123456",
				driver_license: "32432342",
			};

			await usersRepositoryInMemory.create(user);

			await authenticateUserUseCase.execute({
				email: "ism@gmail.com",
				password: "sdfsd",
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
