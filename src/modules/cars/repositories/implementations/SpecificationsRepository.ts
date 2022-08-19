import { Specification } from "../../model/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationRepository {
	private constructor() {
		this.specifications = [];
	}

	public static INSTANCE: SpecificationsRepository;

	private specifications: Specification[];

	public static getInstance() {
		// create a instance if an instance does not exist. Return the existing instance if alredy created
		if (!SpecificationsRepository.INSTANCE) {
			SpecificationsRepository.INSTANCE = new SpecificationsRepository();
		}
		return new SpecificationsRepository();
	}

	create({ name, description }: ICreateSpecificationDTO): void {
		const specification = new Specification();

		Object.assign(specification, {
			name,
			description,
			created_at: new Date(),
		});

		this.specifications.push(specification);
	}

	findByName(name: string): Specification {
		return this.specifications.find((specification) => specification.name === name);
	}
}

export { SpecificationsRepository };
