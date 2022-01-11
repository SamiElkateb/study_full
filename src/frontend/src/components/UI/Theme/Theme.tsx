import useTheme from '../../../hooks/useTheme';
import classes from './Theme.module.scss';
const Theme: React.FC = (props) => {
	const { children } = props;
	const { theme } = useTheme();
	const themeClass = `theme-${theme}`;
	return (
		<div className={`${classes['theme-root']} ${themeClass}`}>
			<div className={classes.theme}>{children}</div>
		</div>
	);
};

export default Theme;
