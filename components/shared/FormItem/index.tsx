import { ChangeEvent, memo } from 'react';
import { FormAlertMessage, FormField, FormInput, FormLabel } from './styled';

type Props = {
	id: string;
	label: string;
	type: string;
	placeholder: string;
	value: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	isValid: boolean;
	validationMessage: string;
	required?: boolean;
};

const FormItem = ({
	id,
	label,
	type,
	placeholder,
	value,
	handleChange,
	isValid,
	validationMessage,
	required = false,
}: Props) => {
	return (
		<FormField>
			<FormLabel htmlFor={id}>{label}</FormLabel>
			<FormInput
				id={id}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				aria-required={required}
				aria-invalid={!isValid}
				aria-errormessage={`${id}_validation_error_message`}
			/>
			{!isValid && (
				<FormAlertMessage id={`${id}_validation_error_message`} role="alert">
					{validationMessage}
				</FormAlertMessage>
			)}
		</FormField>
	);
};

export default memo(FormItem);
