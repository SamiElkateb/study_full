import React from 'react';
import classes from './Form.module.scss';

type FormProps = {
	onSubmit?: (event: React.FormEvent) => void;
	title?: string;
	className?: string;
};

const Form: React.FC<FormProps> = (props) => {
	const { children, onSubmit = () => {}, title = '', className = '' } = props;

	const formTitle = title !== '' && <h1>{title}</h1>;
	return (
		<form className={`${classes.form} ${className}`} onSubmit={onSubmit}>
			{formTitle}
			{children}
		</form>
	);
};

export default Form;
