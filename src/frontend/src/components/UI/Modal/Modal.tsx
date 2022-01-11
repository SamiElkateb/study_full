import reactDom from 'react-dom';
import classes from './Modal.module.scss';
import Card from '../Card/Card';
import Theme from '../Theme/Theme';
interface BackdropProps {
	onHideBackdrop: () => void;
}
interface ModalProps {
	onHideModal: () => void;
}
const Backdrop: React.FC<BackdropProps> = (props) => {
	const { onHideBackdrop } = props;
	return <div className={classes.backdrop} onClick={onHideBackdrop}></div>;
};
const ModalOverlay: React.FC = (props) => {
	return (
		<Theme>
			<Card className={`${classes.modal}`}>{props.children}</Card>
		</Theme>
	);
};
const Modal: React.FC<ModalProps> = (props) => {
	const portalElement = document.getElementById('overlays') as Element;
	const { onHideModal } = props;
	return (
		<>
			{reactDom.createPortal(
				<Backdrop onHideBackdrop={onHideModal} />,
				portalElement
			)}
			{reactDom.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default Modal;
