import terminalParser from '../../../helpers/codeParser/terminalParser';
import classes from './Terminal.module.scss';

interface props {
	code: string;
	className?: string;
}
const Terminal: React.FC<props> = (props) => {
	const { code, className = '' } = props;
	let parsedCode = terminalParser(code);

	return (
		<div className={`${classes.terminal} ${className}`}>
			<div className={classes.title}>Terminal</div>
			<div className={classes['code-container']}>
				{parsedCode?.map((element, index) => {
					if (typeof element === 'string') {
						return (
							<span
								className={classes['default-text']}
								key={index}
							>
								{element}
							</span>
						);
					}
					return (
						<span key={index} className={classes.variable}>
							{element.text}
						</span>
					);
				})}
			</div>
		</div>
	);
};

export default Terminal;
