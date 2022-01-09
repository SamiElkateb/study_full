import classes from './Card.module.scss';
interface props {
	className?: string;
}
const Card: React.FC<props> = (props) => {
	const { children, className = '' } = props;
	return (
		<div data-testid={'Card'} className={`${classes.card} ${className}`}>
			{children}
		</div>
	);
};

export default Card;
