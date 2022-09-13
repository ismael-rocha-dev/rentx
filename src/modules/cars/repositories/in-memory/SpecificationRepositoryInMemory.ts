import { ICreateSpecificationDTO } from "../../dtos/CreateSpecificationDTO";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
	users: Specification[] = [];

	async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
		const specification = new Specification();

		Object.assign(specification, {
			name,
			description,
		});

		this.users.push(specification);
	}

	async findByName(name: string): Promise<Specification> {
		return this.users.find((user) => user.name === name);
	}
}

export { SpecificationsRepositoryInMemory };
