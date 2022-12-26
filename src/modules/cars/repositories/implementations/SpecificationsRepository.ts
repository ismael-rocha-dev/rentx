import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationDTO } from "../../dtos/CreateSpecificationDTO";
import { Specification } from "../../infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
	constructor() {
		this.repository = getRepository(Specification);
	}

	private repository: Repository<Specification>;

	async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
		const specification = this.repository.create({ name, description });

		await this.repository.save(specification);
	}

	async findByName(name: string): Promise<Specification> {
		return await this.repository.findOne({ where: { name } });
	}
}

export { SpecificationsRepository };
