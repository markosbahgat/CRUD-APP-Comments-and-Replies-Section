import { IReply } from "./reply.interface";

export interface IComment {
	content: string;
	id: number;
	createdAt: number;
	replies: IReply[];
	score: number;
	user: {
		image: {
			png: string;
			webp: string;
		};
		username: string;
	};
}
