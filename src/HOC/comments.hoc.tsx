import { CommentsSection, BoxModel, NewReply } from 'components';
import React from 'react';
import 'styles/CommentsHOC.scss';
import { useAppSelector } from 'hooks/hooks';
import { FetchState } from 'services/slices/data.slice';
import { IComment } from 'models/Comments.interface';

interface Props {}

const CommentsHOC: React.FC<Props> = () => {
	const state = useAppSelector(FetchState);
	console.log(state);

	return (
		<>
			<BoxModel />
			<div className='all_container'>
				{state.AllComments.map((item: IComment) => (
					<CommentsSection item={item} key={item.id} currentUserName={state.CurrentUser.username} />
				))}
				<NewReply type='New' />
			</div>
		</>
	);
};

export default CommentsHOC;
