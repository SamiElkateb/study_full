import terminalParser from '../../../helpers/codeParser/terminalParser';
import yamlParser from '../../../helpers/codeParser/yamlParser';
import classes from './Yaml.module.scss';
import YamlCodeItem from './YamlCodeItem';

interface props {
	code: string;
	className?: string;
}
const Yaml: React.FC<props> = (props) => {
	const { code, className = '' } = props;
	let parsedCode = yamlParser(code);

	return (
		<div className={`${classes.window} ${className}`}>
			<div className={classes.title}>conf.yml</div>
			<div className={classes['code-container']}>
				{parsedCode?.map((codeItem, index) => {
					return <YamlCodeItem codeItem={codeItem} key={index} />;
				})}
			</div>
		</div>
	);
};

export default Yaml;
