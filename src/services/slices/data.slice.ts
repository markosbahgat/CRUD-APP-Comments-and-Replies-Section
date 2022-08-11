import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from 'models/Comments.interface';
import { RootState } from '../store/store';
import { showModel } from './essentials.slice';
import { IReply } from 'models/reply.interface';
import { getAllComments } from 'middleware';

interface IFetchState {
	AllComments: IComment[];
	CurrentUser: {
		username: string;
		image: {
			png: string;
			webp: string;
		};
	};

	identifiers: {
		parent: string | number | undefined;
		child: string | number | undefined;
	};
}
interface IdentifiersPayload {
	child?: number | string;
	parent?: number | string;
}
const initialState: IFetchState = {
	AllComments: [],
	CurrentUser: {
		username: '',
		image: {
			png: '',
			webp: ''
		}
	},
	identifiers: {
		parent: undefined,
		child: undefined
	}
};
const FetchSlice = createSlice({
	name: 'fetch',
	initialState,
	reducers: {
		upVote: (state: IFetchState, { payload }: PayloadAction<IdentifiersPayload>) => {
			const target = state.AllComments.find((item) => item.id === payload.child);
			if (target) {
				target.score += 1;
			} else if (!target) {
				const parentTarget = state.AllComments.find((item) => item.id === payload.parent);
				if (parentTarget) {
					const childTarget = parentTarget.replies.find((reply: IReply) => reply.id === payload.child);
					if (childTarget) {
						childTarget.score += 1;
					}
				}
			}
		},
		downVote: (state: IFetchState, { payload }: PayloadAction<IdentifiersPayload>) => {
			const target = state.AllComments.find((item) => item.id === payload.child);
			if (target && target.score !== 0) {
				target.score -= 1;
			} else if (!target) {
				const parentTarget = state.AllComments.find((item) => item.id === payload.parent);
				if (parentTarget) {
					const childTarget = parentTarget.replies.find((reply: IReply) => reply.id === payload.child);
					if (childTarget && childTarget.score !== 0) {
						childTarget.score -= 1;
					}
				}
			}
		},
		appendReply: (
			state: IFetchState,
			{ payload }: PayloadAction<{ reply: IReply; commentId: number; replyId?: number }>
		) => {
			const target = state.AllComments.find((item) => item.id === payload.commentId);
			if (target) {
				const childTarget = target.replies.find((item) => item.id === payload.replyId);
				if (childTarget) {
					console.log(current(childTarget));
					childTarget.replies.push(payload.reply);
				}
			}
		},
		appendComment: (state: IFetchState, { payload }: PayloadAction<{ replyId?: number; comment: IComment }>) => {
			const target = state.AllComments.find((item) => item.id === payload.replyId);
			if (target) target.replies.push(payload.comment);
		},
		appendNewComment: (state: IFetchState, { payload }: PayloadAction<IComment>) => {
			state.AllComments.push(payload);
		},
		editReply: (
			state: IFetchState,
			{ payload }: PayloadAction<{ commentId?: number; replyId: number; content: string }>
		) => {
			const target = state.AllComments.find((item) => item.id === payload.commentId);
			if (target) {
				const childTarget = target.replies.find((item) => item.id === payload.replyId);
				if (childTarget) childTarget.content = payload.content;
			}
		},
		editComment: (state: IFetchState, { payload }: PayloadAction<{ id: number; content: string }>) => {
			const target = state.AllComments.find((item) => item.id === payload.id);
			if (target) {
				target.content = payload.content;
			}
		},
		deleteReply: (state: IFetchState) => {
			if (state.identifiers.parent) {
				const parentTarget = state.AllComments.find((item) => item.id === state.identifiers.parent);
				if (parentTarget) {
					if (parentTarget.replies.length > 0) {
						parentTarget.replies = parentTarget.replies.filter(
							(item) => item.id !== state.identifiers.child
						);
					}
				}
			} else {
				state.AllComments = state.AllComments.filter((item) => item.id !== state.identifiers.child);
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(
			showModel,
			(state, { payload }: PayloadAction<{ parent?: string | number; child?: string | number }>) => {
				state.identifiers.child = payload.child;
				state.identifiers.parent = payload.parent;
			}
		);
		builder.addCase(getAllComments.fulfilled, (state: IFetchState, { payload }) => {
			state.AllComments = payload.comments;
			state.CurrentUser = payload.currentUser;
		});
	}
});

export const FetchReducer = FetchSlice.reducer;
export const { upVote, downVote, appendReply, editReply, deleteReply, appendComment, appendNewComment, editComment } =
	FetchSlice.actions;
export const FetchState = (state: RootState) => state.root.fetch;
