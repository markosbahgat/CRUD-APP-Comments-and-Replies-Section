import React from 'react';
import './style.scss';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { essentialState, showModel } from 'services/slices/essentials.slice';
import { deleteReply } from 'services/slices/data.slice';

interface Props extends React.HTMLProps<HTMLAllCollection> {}

const BoxModel: React.FC<Props> = () => {
	const state = useAppSelector(essentialState);
	const dispatch = useAppDispatch();
	const cancelBtn = () => {
		dispatch(showModel({ case: false, parent: undefined, child: undefined }));
	};
	const deleteBtn = () => {
		dispatch(deleteReply());
		dispatch(showModel({ case: false, parent: undefined, child: undefined }));
	};
	return (
		<section className='section' id={`${state.show && 'show'}`}>
			<div className='popup_outer'>
				<div className='popup_box'>
					<i id='close' className='fas fa-close' onClick={cancelBtn} />
					<h1>Delete Comment</h1>
					<p>
						Are you sure you want to delete this comment? This will remove the comment and can''t be undone
					</p>
					<div className='button'>
						<button className='clear' onClick={cancelBtn}>
							NO, CANCEL
						</button>
						<button className='send' onClick={deleteBtn}>
							YES, DELETE
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BoxModel;
