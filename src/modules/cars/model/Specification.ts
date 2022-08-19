import { v4 as uuid_v4 } from "uuid";

class Specification {
	constructor() {
		if (!this.id) {
			this.id = uuid_v4();
		}
	}
	id?: string;
	name: string;
	description: string;
	created_at: Date;
}

export { Specification };
