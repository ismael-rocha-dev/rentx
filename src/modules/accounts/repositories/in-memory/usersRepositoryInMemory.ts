import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
	users: User[] = [];
	async create(data: ICreateUserDTO): Promise<void> {
		const user = new User();
		Object.assign(user, data);
		this.users.push(user);
	}

	async findByEmail(email: string): Promise<User> {
		const user = this.users.find((usr) => usr.email === email);
		return user;
	}

	async findById(id: string): Promise<User> {
		const user = this.users.find((usr) => usr.id === id);
		return user;
	}

	async updateById(id: string, data: IUpdateUserDTO): Promise<void> {
		const userIndex = this.users.findIndex((usr) => usr.id === id);
		Object.assign(this.users[userIndex], data);
	}
}

export { UsersRepositoryInMemory };
