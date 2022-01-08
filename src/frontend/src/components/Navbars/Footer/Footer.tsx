import classes from './Footer.module.scss';
import { Link } from 'react-router-dom';
const Footer: React.FC = () => {
	return (
		<footer className={classes.footer} data-testid={'Footer'}>
			<nav>
				<ul>
					<li>
						<Link to={'/'}>Terms &amp; Conditions</Link>
					</li>
					<li>
						<Link to={'/'}>Privacy Policy</Link>
					</li>
					<li>
						<Link to={'/'}>About</Link>
					</li>
					<li>
						<Link to={'/'}>Contact</Link>
					</li>
					<li className={classes.copyright}>
						Copyright © 2022 StudyApp
					</li>
				</ul>
			</nav>
		</footer>
	);
};

export default Footer;
