import classes from './DashboardSection.module.scss';

const DashboardSection: React.FC = (props) => {
	const { children } = props;
	return <section className={classes['study-section']}>{children}</section>;
};

export default DashboardSection;
