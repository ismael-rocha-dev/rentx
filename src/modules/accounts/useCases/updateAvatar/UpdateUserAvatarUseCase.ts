import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";

@injectable()
class UpdateUserAvatarUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute({ user_id, avatar_file }): Promise<void> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new Error("User not found!");
		}

		const previous_avatar_file = user.avatar;

		if (previous_avatar_file) {
			await deleteFile(`./tmp/avatar/${previous_avatar_file}`);
		}

		await this.usersRepository.updateById(user_id, { avatar: avatar_file });
	}
}

export { UpdateUserAvatarUseCase };
