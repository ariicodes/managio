export interface Event {
	id: string;
	name: string;
	date: string;
	location: string;
	description?: string;
}

export interface UserInput {
	name: string;
	email: string;
	phone: string;
}
