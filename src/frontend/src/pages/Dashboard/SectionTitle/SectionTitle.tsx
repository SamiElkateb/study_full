import Card from '../../../components/UI/Card/Card';
import Icon from '../../../components/UI/Icons/Icon';
import { iconNamesType } from '../../../types/types';
import classes from './SectionTitle.module.scss';

interface props {
	title: string;
	description: string;
	iconName?: iconNamesType;
}
const SectionTitle: React.FC<props> = (props) => {
	const { title, description, iconName } = props;
	return (
		<Card className={classes['title-container']}>
			<div className={classes.wrapper}>
				{iconName && <Icon name={iconName} className={classes.icon} />}
				<div className={classes.text}>
					<h1 className={classes.title}>{title}</h1>
					<p className={classes.description}>{description}</p>
				</div>
			</div>
		</Card>
	);
};
export default SectionTitle;
