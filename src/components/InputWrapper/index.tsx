import { InputWrapper, Input } from '@mantine/core';

type InputWrapperComponent = {
	label: string;
	error?: string;
	required?: boolean;
	description?: string;
	placeholder: string;
	value: string;
	handleChange: any;
	size?: 'md' | 'lg' | 'xl' | 'sm';
	className: any;
};

const InputWrapperComponent = (props: InputWrapperComponent) => {
	const { label, error, value, handleChange, required, description, placeholder, size, className } = props;

	return (
		<InputWrapper
			id="input-demo"
			required={required}
			label={label}
			description={description ? description : ''}
			error={error ? error : ''}
		>
			<Input id="input-demo" className={className} size={size ?? 'md'} placeholder={placeholder} value={value} onChange={handleChange} />
		</InputWrapper>
	);
};

export default InputWrapperComponent;
