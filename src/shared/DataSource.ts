import "reflect-metadata";

import { DataSource } from "typeorm";

export default new DataSource({
	type: "postgres",
	host: "localhost",
	username: "docker",
	password: "ignite",
	database: "rentx",
	port: 5432,
	migrations: ["./src/database/migrations/*.ts"],
	entities: ["./src/modules/**/entities/*.ts"],
});
