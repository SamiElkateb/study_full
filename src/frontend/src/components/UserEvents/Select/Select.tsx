/** @format */
import { IconType } from 'react-icons';
import Icon from '../../UI/Icons/Icon';
import classes from './Select.module.scss';

type InputProps = {
	className?: string;
	items: string[];
	name: string;
	value: string;
	placeholder?: string;
	onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
	onBlur?: (event: React.FormEvent<HTMLInputElement>) => void;
	readOnly?: boolean;
	defaultValue?: string;
};

const Select: React.FC<InputProps> = (props) => {
	const {
		className = '',
		items,
		name,
		value,
		onChange,
		placeholder = 'Select an option',
		onBlur = () => {},
		readOnly = false,
	} = props;
	const id = Math.random() + name;

	return (
		<select
			name={name}
			id={id}
			value={value}
			className={classes.select}
			onChange={onChange}
		>
			<option value="">{placeholder}</option>
			{items.map((value, index) => (
				<option key={`${index}_${value}`} value={value}>
					{value}
				</option>
			))}
		</select>
	);
};

export default Select;
