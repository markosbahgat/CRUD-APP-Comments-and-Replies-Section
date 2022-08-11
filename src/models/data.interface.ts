import { IComment } from "./Comments.interface";

interface comments {
	comments: IComment[];
}
export interface IData extends comments {
	currentUser: {
		image: {
			png: string;
			webp: string;
		};
		username: string;
	};
}
