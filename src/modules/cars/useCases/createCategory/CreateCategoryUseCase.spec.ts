import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: ICategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
		createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
	});

	it("Should be able to create a new category", async () => {
		const category = {
			name: "Category est name",
			description: "Category test description",
		};

		await createCategoryUseCase.execute({
			name: category.name,
			description: category.description,
		});

		const createdCategory = await categoriesRepositoryInMemory.findByName(category.name);

		expect(createdCategory).toHaveProperty("id");
	});

	it("should not be able to create a new category with same name", async () => {
		expect(async () => {
			const category = {
				name: "test name",
				description: "test description",
			};

			await createCategoryUseCase.execute(category);
			await createCategoryUseCase.execute(category);
		}).rejects.toBeInstanceOf(AppError);
	});
});
