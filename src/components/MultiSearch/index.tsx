import { forwardRef } from 'react';
import { MultiSelect, Box, CloseButton, SelectItemProps, MultiSelectValueProps, Image } from '@mantine/core';

type MultiSelectProps = {
	cdata: any;
	label: string;
	placeholder: string;
	handleChange: any;
	component?: string;
};

const MultiSelectComponent = (props: MultiSelectProps) => {
	const { cdata, handleChange, component } = props;

	function Value({ value, label, onRemove, classNames, ...others }: MultiSelectValueProps & { value: string }) {
		const colorSwatch = cdata.find((c: any) => c.color === value)?.colorSwatch
		return (
			<div {...others}>
				<Box
					sx={(theme) => ({
						display: 'flex',
						cursor: 'default',
						alignItems: 'center',
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
					})}
				>
					{component === 'color' && colorSwatch ? (
						<Box mr={10}>
							<Image
								radius="xl"
								width={12}
								height={12}
								src={colorSwatch}
							/>
						</Box>
					) : (
						''
					)}
					<Box sx={{ lineHeight: 1, fontSize: 12 }}>{label}</Box>
					<CloseButton onMouseDown={onRemove} variant="transparent" size={22} iconSize={14} tabIndex={-1} />
				</Box>
			</div>
		);
	}

	const Item = forwardRef<HTMLDivElement, SelectItemProps>(function referenceFunc({ label, value, ...others }, ref) {
		const colorSwatch = cdata.find((c: any) => c.color === value)?.colorSwatch
		return (
			<div ref={ref} {...others}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					{component === 'color' && colorSwatch ? (
						<Box mr={10}>
							<Image
								radius="xl"
								width={12}
								height={12}
								src={colorSwatch}
							/>
						</Box>
					) : (
						''
					)}
					<div>{label}</div>
				</Box>
			</div>
		);
	});

	return (
		<MultiSelect
			data={
				component === 'color'
					? [...new Map(cdata.map((item: any) => [item['color'], item])).values()].map((c: any) => c.color)
					: cdata
			}
			valueComponent={Value}
			itemComponent={Item}
			searchable
			onChange={handleChange}
			maxDropdownHeight={500}
			{...props}
		/>
	);
};

export default MultiSelectComponent;
