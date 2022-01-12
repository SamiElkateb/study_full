import { useState } from 'react';
import { learnModulesIconNames } from '../../../constants/IconNames';
import { iconNamesType } from '../../../types/types';
import Icon from '../../UI/Icons/Icon';
import classes from './IconSelect.module.scss';

type InputProps = {
	className?: string;
	iconColor?: string;
	name: string;
	value: iconNamesType;
	placeholder?: string;
	onChange: (event: iconNamesType) => void;
	onBlur?: (event: React.FormEvent<HTMLInputElement>) => void;
	readOnly?: boolean;
	defaultValue?: string;
};

const IconSelect: React.FC<InputProps> = (props) => {
	const {
		className = '',
		name,
		value,
		onChange,
		placeholder = 'Select an option',
		onBlur = () => {},
		iconColor = 'black',
	} = props;
	const id = Math.random() + name;
	const [optionsVisible, setOptionsVisible] = useState(false);

	const showIconsHandler = () => {
		setOptionsVisible(true);
	};
	const hideIconOptionsHandler = () => {
		setOptionsVisible(false);
	};
	const selectIconHandler = (iconName: iconNamesType) => {
		onChange(iconName);
		setOptionsVisible(false);
	};

	return (
		<div className={classes['icon-select']}>
			<button
				type="button"
				className={classes['select-button']}
				onClick={showIconsHandler}
			>
				<div className={classes['selected-icon']}>
					<Icon name={value} color={iconColor} /> icon_{value}
				</div>
				<input name={name} hidden={true} />
			</button>

			{optionsVisible && (
				<div className={classes['icon-options']}>
					<button
						className={classes.quit}
						onClick={hideIconOptionsHandler}
						type="button"
					>
						<Icon name={'close'} size="small" color={'red'} />
					</button>
					{learnModulesIconNames.map((iconName, index) => (
						<button
							type="button"
							key={`${index}_${iconName}`}
							onClick={selectIconHandler.bind(null, iconName)}
						>
							<Icon name={iconName} size="med" />
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default IconSelect;
