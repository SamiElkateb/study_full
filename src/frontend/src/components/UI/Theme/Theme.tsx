import classes from './Theme.module.scss';
const Theme: React.FC = (props) => {
	const { children } = props;
	return (
		<div className={`${classes['theme-root']} theme-light`}>
			<div className={classes.theme}>{children}</div>
		</div>
	);
};

export default Theme;
