import React, { useState } from 'react';
import './comments.scss';
import { IComment } from 'models/Comments.interface';
import NewReply from '../newReply/NewReplyForm';
import { upVote, downVote, FetchState, editComment } from 'services/slices/data.slice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { showModel } from 'services/slices/essentials.slice';
import { IReply } from 'models/reply.interface';
import ReplySection from '../all_Replies/replies.components.';

interface IReplaing extends IComment {
	replyingTo?: string;
}
interface Props {
	item: IReplaing;
	currentUserName?: string;
	commentId?: number;
}

const CommentsSection: React.FC<Props> = ({ item, currentUserName, commentId }) => {
	const [inputValue, setInputValue] = useState<string>(item.content);
	const [show, setShow] = useState<boolean>(false);
	const [editModeOn, setEditModeOn] = useState<boolean>(false);
	const [inc, setInc] = useState<number>(0);
	const dispatch = useAppDispatch();
	const state = useAppSelector(FetchState);
	const handleUp = () => {
		if (inc <= 0) {
			dispatch(upVote({ child: item.id, parent: commentId }));
			setInc((inc) => inc + 1);
		}
	};
	const handleDown = () => {
		if (inc > -1) {
			dispatch(downVote({ child: item.id, parent: commentId }));
			setInc((inc) => inc - 1);
		}
	};
	const handleDelete = () => {
		dispatch(showModel({ case: true, parent: commentId, child: item.id }));
	};
	const handleUpdate = () => {
		dispatch(editComment({ id: item.id, content: inputValue }));
		setEditModeOn((editModeOn) => !editModeOn);
	};
	const date = new Date();
	let dateNow = date.getTime();
	const timeDifference = Math.floor((dateNow - item.createdAt) / 1000 / 60);
	const timeStamp =
		timeDifference > 0
			? timeDifference > 524160
				? Math.floor(timeDifference / 524160) + ' Years Ago'
				: timeDifference > 43680
				? Math.floor(timeDifference / 43680) + ' Months Ago'
				: timeDifference > 10920
				? Math.floor(timeDifference / 10920) + ' Weeks Ago'
				: timeDifference > 1560
				? Math.floor(timeDifference / 1560) + ' Days Ago'
				: timeDifference > 60
				? Math.floor(timeDifference / 60) + ' Hours Ago'
				: timeDifference + ' Minutes Ago'
			: 'A Few Seconds Ago';
	return (
		<>
			<section className='comment_section' id='comment'>
				<div className='likes_container'>
					<button onClick={handleUp}>
						<i className='fa-solid fa-plus' />
					</button>
					<span>{item.score}</span>
					<button onClick={handleDown}>
						<i className='fa-solid fa-minus' />
					</button>
				</div>
				<div className='comment_container'>
					<div className='identity_container'>
						<div className='person_container'>
							<img
								src={item.user.image.png}
								alt='avatarImg'
								className='avatar_Img'
								data-testid='avatar'
							/>
							<h4>{item.user.username}</h4>
							{item.user.username === currentUserName && <title className='badge'>You</title>}
							<span>{timeStamp}</span>
						</div>
					</div>
					{editModeOn ? (
						<>
							<textarea
								value={inputValue}
								className='textarea'
								onChange={(e) => setInputValue(e.target.value)}></textarea>
							<button className='update_button' onClick={handleUpdate}>
								Update
							</button>
						</>
					) : (
						<p>{item.content}</p>
					)}
				</div>
				<div className='reply_button_container'>
					{item.user.username !== currentUserName ? (
						<button onClick={() => setShow(true)}>
							<i className='fa-solid fa-reply' /> Reply
						</button>
					) : (
						<div style={{ whiteSpace: 'nowrap' }}>
							<button className='delete_btn' onClick={handleDelete}>
								<i className='fa-solid fa-trash' /> Delete
							</button>
							<button onClick={() => setEditModeOn((editModeOn) => !editModeOn)}>
								<i className='fa-solid fa-pen' /> Edit
							</button>
						</div>
					)}
				</div>
			</section>
			{show && (
				<NewReply
					setShow={setShow}
					type={item.replyingTo ? true : false}
					commentId={commentId}
					replyId={item.id}
				/>
			)}
			{item.replies.length > 0 && (
				<div className='reply_container'>
					<hr />
					<div className='replies'>
						{item.replies.map((reply: IReply) => (
							<ReplySection
								key={reply.id}
								commentId={item.id}
								item={reply}
								currentUserName={state.CurrentUser.username}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default CommentsSection;
