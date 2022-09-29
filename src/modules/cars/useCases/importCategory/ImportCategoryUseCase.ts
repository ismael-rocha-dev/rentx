import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
import fs from "fs";
import csvParser from "csv-parser";
import { ICreateCategoryDTO } from "@modules/cars/dtos/CreateCategoryDTO";
import { inject, injectable } from "tsyringe";

@injectable()
class ImportCategoryUseCase {
	constructor(
		@inject("CategoriesRepository")
		private categoriesRepository: CategoriesRepository
	) {}

	loadCategories(file): Promise<ICreateCategoryDTO[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path);
			const parseFile = csvParser();

			stream.pipe(parseFile);

			const categories = [];

			parseFile
				.on("data", async (line) => {
					categories.push(line);
				})
				.on("end", () => {
					fs.promises.unlink(file.path);
					resolve(categories);
				})
				.on("error", (err) => {
					reject(err);
				});
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);

		categories.map(async (category) => {
			const { name, description } = category;

			const categoryExists = this.categoriesRepository.findByName(name);

			if (!categoryExists) {
				this.categoriesRepository.create({ name, description });
			}
		});
	}
}

export { ImportCategoryUseCase };
