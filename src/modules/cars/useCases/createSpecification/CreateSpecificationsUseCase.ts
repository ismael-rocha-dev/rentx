import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { ICreateSpecificationDTO } from "@modules/cars/dtos/CreateSpecificationDTO";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

@injectable()
class CreateSpecificationsUseCase {
	constructor(
		@inject("SpecificationRepository")
		private specificationRepository: ISpecificationsRepository
	) {}

	async execute({ name, description }: ICreateSpecificationDTO) {
		const specificationAlreadyExists = await this.specificationRepository.findByName(name);

		if (specificationAlreadyExists) {
			throw new AppError("Specificaion already exists!");
		}

		await this.specificationRepository.create({ name, description });
	}
}

export { CreateSpecificationsUseCase };
