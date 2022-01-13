import { useState } from 'react';
import Icon from '../../UI/Icons/Icon';
import Modal from '../../UI/Modal/Modal';
import Button from '../Button/Button';
import classes from './EditToolbox.module.scss';

interface props {
	active?: boolean;
	onEdit?: () => void;
	onDelete?: () => void;
}

const EditToolbox: React.FC<props> = (props) => {
	const {
		children,
		active = false,
		onDelete = () => {},
		onEdit = () => {},
	} = props;

	const [showModal, setShowModal] = useState(false);
	const editingClass = active ? classes['toolbox-visible'] : '';

	const showModalHandler = () => {
		setShowModal(true);
	};
	const hideModalHandler = () => {
		setShowModal(false);
	};
	const deleteHandler = () => {
		onDelete();
		setShowModal(false);
	};
	return (
		<div className={classes['toolbox-container']}>
			<div className={`${classes['toolbox-options']} ${editingClass}`}>
				<button onClick={onEdit} className={classes['edit-button']}>
					<Icon name="options" size="x-small" />
				</button>
				<button
					onClick={showModalHandler}
					className={classes['delete-button']}
				>
					<Icon name="close" size="x-small" />
				</button>
			</div>
			{children}
			{showModal && (
				<Modal onHideModal={hideModalHandler}>
					<h3>
						Are You sure you want to delete this element and all its
						children?
					</h3>
					<div>
						<Button onClick={hideModalHandler}>Cancel</Button>
						<Button onClick={deleteHandler}>Yes</Button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default EditToolbox;
