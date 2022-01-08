import classes from './Theme.module.scss';
const Theme: React.FC = (props) => {
	const { children } = props;
	return <div className={`${classes.theme} theme-light`}>{children}</div>;
};

export default Theme;
