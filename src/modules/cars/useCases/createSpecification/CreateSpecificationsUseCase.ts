import { ICreateSpecificationDTO } from "../../repositories/ISpecificationsRepository";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

class CreateSpecificationsUseCase {
	constructor(private specificationRepository: SpecificationsRepository) {}

	execute({ name, description }: ICreateSpecificationDTO) {
		const specificationAlreadyExists = this.specificationRepository.findByName(name);

		if (specificationAlreadyExists) {
			throw new Error("Specificaion already exists!");
		}

		this.specificationRepository.create({ name, description });
	}
}

export { CreateSpecificationsUseCase };
