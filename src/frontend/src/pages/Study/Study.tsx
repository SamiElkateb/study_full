import classes from './Study.module.scss';

import LeftNav from '../../components/Navbars/LeftNav/LeftNav';

const Study: React.FC = (props) => {
	return (
		<main className={classes.study}>
			<LeftNav />
		</main>
	);
};

export default Study;
