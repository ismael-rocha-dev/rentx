import { ICreateSpecificationDTO } from "../dtos/CreateSpecificationDTO";
import { Specification } from "../entities/Specification";

interface ISpecificationsRepository {
	create({ name, description }: ICreateSpecificationDTO): Promise<void>;
	findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository };
