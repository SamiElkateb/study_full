import { javascriptCodeType, yamlCodeType } from '../../../types/types';
import classes from './Yaml.module.scss';

interface props {
	codeItem: string | { text: string; type: yamlCodeType };
}

const YamlCodeItem: React.FC<props> = (props) => {
	const { codeItem } = props;
	if (typeof codeItem === 'string') {
		return (
			<span className={classes['default-text']}>
				{codeItem.toString()}
			</span>
		);
	}

	return (
		<span className={classes[codeItem.type]}>
			{codeItem.text.toString()}
		</span>
	);
};

export default YamlCodeItem;
