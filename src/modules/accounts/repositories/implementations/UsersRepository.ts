import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import { hash } from "bcryptjs";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";

class UsersRepository implements IUsersRepository {
	constructor() {
		this.repository = getRepository(User);
	}

	private repository: Repository<User>;

	async create({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
		const passwordHash = await hash(password, 8);
		const user = this.repository.create({
			name,
			email,
			password: passwordHash,
			driver_license,
		});

		await this.repository.save(user);
	}

	async updateById(id: string, data: IUpdateUserDTO): Promise<void> {
		await this.repository.update(id, data);
	}

	async findByEmail(email: string): Promise<User> {
		const user = this.repository.findOneBy({ email });

		return user;
	}

	async findById(id: string): Promise<User> {
		const user = this.repository.findOneBy({ id });
		return user;
	}
}

export { UsersRepository };
