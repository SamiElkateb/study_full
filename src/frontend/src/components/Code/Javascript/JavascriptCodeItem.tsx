import { javascriptCodeType } from '../../../types/types';
import classes from './Javascript.module.scss';

interface props {
	codeItem: string | { text: string; type: javascriptCodeType };
}

const JavascriptCodeItem: React.FC<props> = (props) => {
	const { codeItem } = props;
	if (typeof codeItem === 'string') {
		return (
			<span className={classes['default-text']}>
				{codeItem.toString()}
			</span>
		);
	}
	if (codeItem.type === 'linebreak') {
		return (
			<span className={classes['line-break']}>
				{codeItem.text.toString()}
			</span>
		);
	}

	return (
		<span className={classes[codeItem.type]}>
			{codeItem.text.toString()}
		</span>
	);
};

export default JavascriptCodeItem;
