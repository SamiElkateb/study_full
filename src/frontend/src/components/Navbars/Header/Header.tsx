import classes from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header: React.FC = () => {
	const [scrolled, setScrolled] = useState(false);

	const headerClasses = [classes.header];

	const handleScroll = () => {
		const offset = window.scrollY;
		if (offset > 10) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll, true);
		};
	}, []);

	if (scrolled) {
		headerClasses.push(classes.sticky);
	}

	let authElements = (
		<li className={classes.auth}>
			<ul>
				<li className={classes.login}>
					<Link to="/">Log In</Link>
				</li>
				<li className={classes.signup}>
					<Link to="/">Signup</Link>
				</li>
			</ul>
		</li>
	);
	return (
		<header className={headerClasses.join(' ')}>
			<nav>
				<ul>
					<li className={classes['brand-name']}>
						<Link to="/">StudyApp</Link>
					</li>
					<li>
						<Link to="/about">About Us</Link>
					</li>
					{authElements}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
