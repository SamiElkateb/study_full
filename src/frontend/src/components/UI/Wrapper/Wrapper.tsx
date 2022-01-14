import classes from './Wrapper.module.scss';
interface props {
	className?: string;
}
const Wrapper: React.FC<props> = (props) => {
	const { children, className } = props;
	const styles = [classes.wrapper];
	className && styles.push(className);
	return <div className={styles.join(' ')}>{children}</div>;
};
export default Wrapper;
