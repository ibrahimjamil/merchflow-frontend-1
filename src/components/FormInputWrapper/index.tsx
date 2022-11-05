import { InputWrapper, Input } from '@mantine/core';
import { stringToRegex } from '../../utils/common';

type InputWrapperComponent = {
    label?: string;
    placeholder: string;
    name: string;
    register: any;
    description?: string;
    className?: any
    required?: boolean;
    error?: string;
    pattern?: string;
    disabled?: boolean;
}

const FormInputWrapperComponent = (props: InputWrapperComponent) =>  {
  const {
      label,
      register,
      name,
      placeholder,
      description,
      className,
      required,
      error,
      pattern,
      disabled
  } = props;

  return (
    <InputWrapper
      label={label}
      description={description ?? description}
      required={required ?? required}
      className={className ?? className}
      error={!!error ? error : ''}
    >
      <Input 
        placeholder={placeholder} 
        {
          ...register(
            name, 
            { 
              pattern: pattern ? stringToRegex(pattern) : undefined 
            }
          )
        }
        disabled={disabled ??  disabled}
      />
    </InputWrapper>
  );
}

export default FormInputWrapperComponent;