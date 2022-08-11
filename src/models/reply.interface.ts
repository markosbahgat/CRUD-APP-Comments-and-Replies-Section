export interface IReply {
	content: string;
	id: number;
	createdAt: number;
	replyingTo?: string;
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
