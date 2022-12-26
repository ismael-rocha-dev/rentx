import { AppError } from "@errors/AppError";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

let specificationsRepositoryInMemory: ISpecificationsRepository;
let createSpecificationUseCase: CreateSpecificationsUseCase;

describe("Create Specification", () => {
	beforeEach(async () => {
		specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
		createSpecificationUseCase = new CreateSpecificationsUseCase(specificationsRepositoryInMemory);
	});

	it("should be able to create a new Specification", async () => {
		const exampleSpecification = {
			name: "test",
			description: "test",
		};

		await createSpecificationUseCase.execute(exampleSpecification);

		const newSpecification = await specificationsRepositoryInMemory.findByName(exampleSpecification.name);

		expect(newSpecification).toHaveProperty("id");
	});

	it("should not be able to create a new specification with same name", async () => {
		expect(async () => {
			const exampleSpecification = {
				name: "test",
				description: "test",
			};

			await createSpecificationUseCase.execute(exampleSpecification);
			await createSpecificationUseCase.execute(exampleSpecification);
		}).rejects.toBeInstanceOf(AppError);
	});
});
