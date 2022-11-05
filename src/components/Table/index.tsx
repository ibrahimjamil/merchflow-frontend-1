import { Table, Image, Grid, Badge, createStyles, Popover, Box, Button, Title, Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';
import AddIndustryNumModal from './AddIndustryNumModal';
import StockValue from './StockValue';
import VendorProductStyleName from './VendorProductStyleName';
import ProductDescriptionModal from '../Modal/index';

type TableComponentProps = {
	striped?: boolean;
	tableHead: string[];
	tableBodyData: any;
	verticalSpacing?: any;
	headLineHeight?: string;
	horizontalSpacing?: any;
	minimumQty: number | undefined;
	handleFilterProducts: (productId: string) => void;
	fetchingVariantsStock: boolean;
};

const useStyles = createStyles(() => ({
	stockBadge: {
		color: 'grey',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	stockBadgeCircle: {
		height: '10px',
		width: '10px',
		borderRadius: '50%',
		display: 'inline-block',
		marginRight: '5px',
	},
	colorDataContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyProductsGrid: {
		display: 'flex',
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tableRow: {
		cursor: 'pointer',
	},
}));

type StockDataProps = {
	stock: number;
	minimumQty: number | undefined;
	productGtin: string;
	vendors: Array<{ id: number; vendorId: number; stock: number; vendorStyleId: number }>;
	showIndustryNumberModal: () => void;
};

const TableComponent = (props: TableComponentProps) => {
	const [show, setShow] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [selectedRow, setSelectedRow] = useState({});
	const {
		striped,
		tableHead,
		tableBodyData,
		verticalSpacing,
		horizontalSpacing,
		minimumQty,
		handleFilterProducts,
		fetchingVariantsStock,
	} = props;

	const { classes } = useStyles();
	const stockBadge = (color: string, stockTitle: string, circleColor: string) => {
		return (
			<Grid.Col span={12} pt={1} pr={0} mr={0}>
				<Badge className={classes.stockBadge} color={color} size="sm">
					<span style={{ backgroundColor: circleColor }} className={classes.stockBadgeCircle} />
					<span>{stockTitle}</span>
				</Badge>
			</Grid.Col>
		);
	};

	const StockData = ({ stock: quantity, vendors, minimumQty, productGtin }: StockDataProps) => {
		const [stock, setStock] = useState(quantity);
		let [updatedStockValues, setUpdatedStockValues] = useState<number[]>([]);
		const [opened, { close, open }] = useDisclosure(false);

		const industryNumber = localStorage.getItem('industryNumber');

		const handleShowModal = (e: any) => {
			e.stopPropagation();
			close();
			showIndustryNumberModal();
		};

		useEffect(() => {
			if (updatedStockValues.length === vendors.length) {
				let totalStock = updatedStockValues.reduce((total, stock) => total + stock, 0);
				setUpdatedStockValues([]);
				setStock(totalStock);
				if (!!minimumQty && minimumQty > totalStock) {
					handleFilterProducts(productGtin);
				}
			}
		}, [updatedStockValues.length, vendors.length]);

		const handleNewStockValue = useCallback((newStock: number) => {
			setUpdatedStockValues([...updatedStockValues, newStock]);
		}, []);

		return (
			<Popover
				target={
					<Badge
						size="lg"
						radius="sm"
						onMouseEnter={open}
						color="blue"
						variant="light"
						sx={{ paddingLeft: 10, color: 'black', paddingRight: 10, width: '70px', opacity: '80%' }}
					>
						{stock}
					</Badge>
				}
				width={300}
				position="bottom"
				withArrow
				shadow="md"
				opened={opened}
				onFocusCapture={open}
				onBlurCapture={close}
			>
				{industryNumber ? (
					<Table>
						<thead>
							<tr>
								<th>Supplier</th>
								<th>Style</th>
								<th>Stock</th>
							</tr>
						</thead>
						<tbody>
							{vendors.map((vendor, index) => {
								return (
									<tr key={vendor.id}>
										<td>{vendor?.vendorId === 1 ? 'SanMar' : 'S&S'}</td>
										<td>
											<VendorProductStyleName vendorProductStyleId={vendor.vendorStyleId} />
										</td>
										<td>
											<StockValue id={vendor.id} handleNewStockValue={handleNewStockValue} />
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				) : (
					<div>
						<p>Please add industry number to view stock by vendor</p>
						<Button onClick={handleShowModal}>Add Number Here</Button>
					</div>
				)}
			</Popover>
		);
	};

	const renderSwitch = (data: any, key: string, showIndustryNumberModal: any) => {
		switch (key) {
			case 'Image':
				return (
					<Grid pl={40}>
						<Image src={data[key]} radius="sm" height={50} width={50} fit="contain" withPlaceholder />
					</Grid>
				);
			case 'Style':
				return (
					<Grid>
						<Grid.Col style={{ fontWeight: 700, color: '#495057' }} span={12} pb={1}>
							{data[key]}
						</Grid.Col>
						{data['Stock'] >= 100
							? stockBadge('green', 'High Stock', '#4BB526')
							: data['Stock'] < 100 && data['Stock'] > 0
							? stockBadge('red', 'Low Stock', '#DD5050')
							: stockBadge('red', 'No Stock', '#A7A8A7')}
					</Grid>
				);
			case 'Color':
				let color = data[key]?.colorSwatch;
				return (
					<Grid className={classes.colorDataContainer}>
						<Grid.Col span={3} pb={0} pr={0} mr={0}>
							{color ? <Image radius="xl" width={10} height={10} src={color} /> : <Box></Box>}
						</Grid.Col>
						<Grid.Col span={9} pb={1}>
							{data[key]?.name}
						</Grid.Col>
					</Grid>
				);
			case 'Stock':
				return fetchingVariantsStock ? (
					<Badge
						size="lg"
						radius="sm"
						color="blue"
						variant="light"
						sx={{ paddingLeft: 10, color: 'black', paddingRight: 10, width: '70px', opacity: '80%' }}
					>
						<Loader variant="dots" size="sm" />
					</Badge>
				) : (
					<StockData
						stock={data[key]}
						vendors={data.vendors}
						minimumQty={minimumQty}
						productGtin={data.gtin}
						showIndustryNumberModal={showIndustryNumberModal}
					/>
				);
			default:
				return data[key];
		}
	};

	const showIndustryNumberModal = () => {
		setShow(true);
	};

	const openProductDescriptionModal = (data: any) => {
		setSelectedRow(data);
		setOpenModal(true);
	};
	const closeProductDescriptionModal = () => {
		setOpenModal(false);
		setSelectedRow({});
	};

	return (
		<>
			{!!tableBodyData?.length ? (
				<>
					<Table
						horizontalSpacing={horizontalSpacing}
						verticalSpacing={verticalSpacing}
						striped={striped ? striped : false}
						highlightOnHover
						style={{ padding: '100px' }}
					>
						<thead
							style={{
								top: 0,
								position: 'sticky',
								background: 'white',
								opacity: 1,
								zIndex: 1,
							}}
						>
							<tr>
								{tableHead.map((headData, index) => {
									if (headData === 'Image') {
										return <th style={{color: "#000000"}} key={index}></th>;
									} else {
										return <th style={{color: "#000000"}} key={index}>{headData}</th>;
									}
								})}
							</tr>
						</thead>
						<tbody>
							{tableBodyData?.map((data: any, outerIndex: number) => {
								return (
									<tr
										className={classes.tableRow}
										key={outerIndex}
										onClick={() => openProductDescriptionModal(data)}
									>
										{Object.keys(data).map((key: any, index) => {
											if (tableHead.includes(key)) {
												return (
													<td style={{ borderBottom: 'none' }} key={index}>
														{renderSwitch(data, key, showIndustryNumberModal)}
													</td>
												);
											}
										})}
									</tr>
								);
							})}
						</tbody>
					</Table>
				</>
			) : (
				<Grid className={classes.emptyProductsGrid}>
					<Box
						sx={(theme) => ({
							backgroundColor: theme.colors.gray[0],
							textAlign: 'center',
							padding: theme.spacing.lg,
							borderRadius: theme.radius.md,
							color: '#495057',
						})}
					>
						No products found
					</Box>
				</Grid>
			)}

			<AddIndustryNumModal show={show} setShow={setShow} />
			<ProductDescriptionModal
				open={openModal}
				close={closeProductDescriptionModal}
				title={<Title order={3}>Product Description</Title>}
				data={selectedRow}
			/>
		</>
	);
};

export default TableComponent;
