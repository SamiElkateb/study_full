import javascriptParser from '../../../helpers/codeParser/javascriptParser';
import classes from './Javascript.module.scss';
import JavascriptCodeItem from './JavascriptCodeItem';

interface props {
	code: string;
	className?: string;
}
const Javascript: React.FC<props> = (props) => {
	const { code, className = '' } = props;
	let parsedCode = javascriptParser(code);

	return (
		<div className={`${classes.window} ${className}`}>
			<div className={classes['title']}>script.js</div>
			<div className={classes['code-container']}>
				{parsedCode?.map((codeItem, index) => {
					return (
						<JavascriptCodeItem codeItem={codeItem} key={index} />
					);
				})}
			</div>
		</div>
	);
};

export default Javascript;
