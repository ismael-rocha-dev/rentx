import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1661343175330 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table({
				name: "users",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "username",
						type: "varchar",
						isUnique: true,
					},
					{
						name: "email",
						type: "varchar",
						isUnique: true,
					},
					{
						name: "password",
						type: "varchar",
					},
					{
						name: "driver_license",
						type: "varchar",
					},
					{
						name: "isAdmin",
						type: "boolean",
						default: false,
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable("users");
	}
}
