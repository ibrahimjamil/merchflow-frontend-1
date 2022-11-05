import { Select } from '@mantine/core';

type SelectComponentProps={
    label: string;
    placeholder?: string;
    data: string[];
    required?: boolean;
    value?: any;
    handleChange?: (e: any) => void;
    description?: string;
    className?: any;
    key?: string;
}

const SelectComponent = (props: SelectComponentProps) => {

    const {label, placeholder, data, value, handleChange, required, description, className, key } = props;
    return (
      <Select
        key={key ?? ''}
        label={label}
        placeholder={placeholder ? placeholder : ''}
        searchable
        nothingFound="No options"
        required={!!required ? required : false}
        data={data}
        value={value} 
        description={description ?? description}
        onChange={handleChange}
        className={className ?? className }
        clearable={true}
      />
    );
  }

export default SelectComponent;