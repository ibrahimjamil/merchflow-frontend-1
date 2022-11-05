import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import emotionStyled from '@emotion/styled';
import { Box, Button } from '@mantine/core';
import { QueryFunctionContext, QueryObserverResult, useMutation, useQuery } from 'react-query';
import { Grid, createStyles, Pagination, Loader, NumberInput, Image } from '@mantine/core';
import { productApi } from '../../../api';
import TableComponent from '../../../components/Table';
import InputWrapper from '../../../components/InputWrapper';
import InfiniteSelectComponent from '../../../components/InfiniteSelect';
import { tableData } from '../../../utils/data';
import { age as ageData, gender as genderData, material as materialData } from '../../../utils/data';

type InfiniteOnChangeType = {
	label: any; // modified label based on condition of list specific for color
	colorSwatch?: string;
	actualLabel: string; // actual item label before any modification for filtering
	value: number;
}[];

const useStyles = createStyles(() => ({
	productFilters: {
		margin: '0px !important',
		width: '100%',
	},
	pagination: {
		width: '100%',
		marginTop: '10px',
		marginBottom: '10px',
		justifyContent: 'center',
		paddingRight: '20px',
	},
	submitButton: {
		height: '38px !important',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	minimumQtyBtn: {
		input: {
			height: '38px !important',
			fontSize: '15px',
			fontWeight: 500,
			':focus': {
				border: '2px solid #187eff !important',
			},
			'::placeholder': {
				color: '#808080',
			},
		},
	},
	searchPlace: {
		input: {
			height: '38px !important',
			color: 'black',
			fontSize: '15px',
			fontWeight: 500,
			':focus': {
				border: '2px solid #187eff !important',
			},
			'::placeholder': {
				color: '#808080',
			},
		},
	},
}));

const FilterContainer = emotionStyled.div`
  height: 100%;
`;

const ProductInventoryTitle = emotionStyled.div`
  width: 100%;
  height: 10vh;
  color: #000000;
  font-size: 1.5em;
  padding-top: 30px;
  background-color: #f4f6f8;
  padding-left: 25px !important;
`;

const ProductFilterContainer = emotionStyled.div`
  width: 100%;
  color: black;
  display: flex;
  font-size: 15px;
  font-weight: 500;
  background-color: #f4f6f8;
  padding-left: 25px !important;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const FilterTitle = emotionStyled.h3`
  flex: 0.15;
  display: flex;
  align-items: flex-end !important;
`;

const ProductFilters = emotionStyled.div`
  flex: 0.95;
  display: flex;
  margin-bottom: 30px;
`;

const ProductContainer = emotionStyled.div`
  display: flex;
  height: 62vh;
	background-color: #f4f6f8;
`;

const ProductSideBarContainer = emotionStyled.div`
  flex: 0.16;
  background-color: #f4f6f8;
  @media only screen and (max-width: 700px) {
    flex: 0;
    display: none;
  }
`;

const ProductsTableContainer = emotionStyled.div`
  flex: 0.84;
  background-color: white;
  overflow-Y: scroll;
	border-radius: 10px;
  @media only screen and (max-width: 700px) {
    flex: 1;
  }
`;

const ProductSideBarFilter = emotionStyled.div`
  display: flex;
  flex-direction: column;
	gap: 20px;
  padding: 20px 40px 20px 20px;
`;

export function AdminDashboard() {
	const { classes } = useStyles();
	const [searchParam, setSearchProduct] = useState('');
	const [productsData, setProductsData] = useState<any[]>([]);
	const [pageNo, setPageNo] = useState('1');
	const [pageSize, setPageSize] = useState('25');
	const [productColor, setProductColor] = useState<string[]>([]);
	const [productSize, setProductSize] = useState<string[]>([]);
	const [productStyle, setProductStyle] = useState<string[]>([]);
	const [productCategory, setProductCategory] = useState<string[]>([]);
	const [productBrand, setProductBrand] = useState<string[]>([]);
	const [productGender, setProductGender] = useState<string[]>([]);
	const [productMaterial, setProductMaterial] = useState<string[]>([]);
	const [productAge, setProductAge] = useState<string[]>([]);
	const [age, setAge] = useState<Array<{ label: any; value: number }>>([]);
	const [gender, setGender] = useState<Array<{ label: any; value: number }>>([]);
	const [material, setMaterial] = useState<Array<{ label: any; value: number }>>([]);
	const [totalProducts, setTotalProducts] = useState(0);
	const [isSearchBegin, setIsSearchBegin] = useState(false);
	const [minimumQuantity, setMinimumQuantity] = useState<number | undefined>();
	const [productColorData, setProductColorData] = useState<{ color: string; colorSwatch: string | undefined }[]>([
		{
			color: '',
			colorSwatch: '',
		},
	]);
	const [productStyleData, setProductStyleData] = useState<string[]>([]);
	const [productSizeData, setProductSizeData] = useState<string[]>([]);
	const [productCategoryData, setProductCategoryData] = useState<string[]>([]);
	const [productBrandData, setProductBrandData] = useState<string[]>([]);
	const [colors, setColors] = useState<Array<{ label: any; value: number }>>([]);
	const [sizes, setSizes] = useState<Array<{ label: any; value: number }>>([]);
	const [categories, setCategories] = useState<Array<{ label: any; value: number }>>([]);
	const [brands, setBrands] = useState<Array<{ label: any; value: number }>>([]);
	const [query, setQuery] = useState<string>('');
	const [doFetchNow, setDoFetchNow] = useState(false);
	const sliceMenuData = 10;
	const [doFetchStockNow, setDoFetchStockNow] = useState(false);
	const [fetchingVariantsStock, setFetchingVariantsStock] = useState(false);

	// get product filter query
	const { refetch: refetchProductsByFilterQuery, isFetching } = useQuery(
		[
			'getProducts',
			'meili/search',
			pageNo,
			pageSize,
			query,
			productBrand,
			productSize,
			productColor,
			productCategory,
			minimumQuantity,
			productAge,
			productGender,
			productMaterial,
		],
		async (params: QueryFunctionContext<any, any>) => {
			return await productApi.getProducts({
				path: params.queryKey[1],
				pageNo: params.queryKey[2],
				pageSize: params.queryKey[3],
				query: params.queryKey[4],
				productSize: JSON.stringify(params.queryKey[6]),
				productBrand: JSON.stringify(params.queryKey[5]),
				productColor: JSON.stringify(params.queryKey[7]),
				productCategory: JSON.stringify(params.queryKey[8]),
				minimumQuantity: params.queryKey[9],
				ageFilter: JSON.stringify(params.queryKey[10]),
				genderFilter: JSON.stringify(params.queryKey[11]),
				materialFilter: JSON.stringify(params.queryKey[12]),
			});
		},
		{
			enabled: false,
		}
	);
	// get product colors query
	const { refetch: refetchProductColorsQuery } = useQuery(
		['getProductColors', 'color'],
		async (params: QueryFunctionContext<any, any>) => {
			return await productApi.getProductColors({
				path: params.queryKey[1],
			});
		},
		{
			enabled: false,
		}
	);

	// get product style query
	const { refetch: refetchProductStyleQuery } = useQuery(
		['getProductStyles', 'style'],
		async (params: QueryFunctionContext<any, any>) => {
			return await productApi.getProductStyles({
				path: params.queryKey[1],
			});
		},
		{
			enabled: false,
		}
	);

	// get product size query
	const { refetch: refetchProductSizeQuery } = useQuery(
		['getProductSizes', 'size'],
		async (params: QueryFunctionContext<any, any>) => {
			return await productApi.getProductSizes({
				path: params.queryKey[1],
			});
		},
		{
			enabled: false,
		}
	);

	// get product category query
	const { refetch: refetchProductCategoryQuery } = useQuery(
		['getProductCategory', 'category'],
		async (params: QueryFunctionContext<any, any>) => {
			return await productApi.getProductCategory({
				path: params.queryKey[1],
			});
		},
		{
			enabled: false,
		}
	);

	// get product brands query
	const { refetch: refetchProductBrandQuery } = useQuery(
		['getProductBrand', 'brand'],
		async (params: QueryFunctionContext<any, any>) => {
			return await productApi.getProductBrands({
				path: params.queryKey[1],
			});
		},
		{
			enabled: false,
		}
	);

	//get  products stock by product variant ids
	const getProductVariantsStockMutation = useMutation('getProductVariantsStock', async (productVariantIds: any) => {
		return await productApi.getProductVariantsStock(productVariantIds);
	});

	// get products first time
	useEffect(() => {
		const fetchQuery = async () => {
			// fetching product
			const productsInfo: QueryObserverResult<
				AxiosResponse<any, any>,
				any
			> = await refetchProductsByFilterQuery();
			setProductsData(productsInfo.data?.data.hits);
			setTotalProducts(productsInfo.data?.data?.estimatedTotalHits);

			// fetching colors
			const productColorsInfo: QueryObserverResult<
				AxiosResponse<any, any>,
				any
			> = await refetchProductColorsQuery();
			let unique = [];
			let distinctProductColors = [];
			let productColors: Array<any> = productColorsInfo.data?.data.map(
				(color: { name: string; colorSwatch?: string }) => {
					return {
						color: color['name'],
						colorSwatch: color['colorSwatch'] || '',
					};
				}
			);
			for (let i = 0; i < productColors.length; i++) {
				if (!unique[productColors[i].color] && !!productColors[i].colorSwatch) {
					distinctProductColors.push(productColors[i]);
					unique[productColors[i].color] = 1;
				}
			}
			setProductColorData([...distinctProductColors]);

			// fetching sizes
			const productSizesInfo: QueryObserverResult<AxiosResponse<any, any>, any> = await refetchProductSizeQuery();
			const productSizes = productSizesInfo.data?.data.map((size: { name: string }) => {
				return size['name'];
			});
			if (productSizes) setProductSizeData(productSizes);

			// fetching styles
			// const productStylesInfo: QueryObserverResult<
			// 	AxiosResponse<any, any>,
			// 	any
			// > = await refetchProductStyleQuery();
			// const productStyles = productStylesInfo.data?.data.map((style: { styleName: string }) => {
			// 	return style['styleName'];
			// });
			// if (productStyles) setProductStyleData(productStyles);

			// fetching category
			const productCategoryInfo: QueryObserverResult<
				AxiosResponse<any, any>,
				any
			> = await refetchProductCategoryQuery();
			const productCategory = productCategoryInfo.data?.data.map((category: { name: string }) => {
				return category['name'];
			});
			if (productCategory) setProductCategoryData(productCategory);

			// fetching brand
			const productBrandInfo: QueryObserverResult<
				AxiosResponse<any, any>,
				any
			> = await refetchProductBrandQuery();
			const productBrands = productBrandInfo.data?.data.map((brand: { name: string }) => {
				return brand['name'];
			});
			if (productBrands) setProductBrandData(productBrands);
		};
		fetchQuery();
	}, []);

	useEffect(() => {
		const fetchQuery = async () => {
			const productsInfo: QueryObserverResult<
				AxiosResponse<any, any>,
				any
			> = await refetchProductsByFilterQuery();
			setProductsData(productsInfo.data?.data.hits);
			setTotalProducts(productsInfo.data?.data?.estimatedTotalHits);
			setDoFetchStockNow(true);
		};
		fetchQuery();
	}, [doFetchNow]);

	// get Products on state change
	useEffect(() => {
		const newQuery = searchParam.trim();
		setQuery(newQuery);
		setDoFetchNow(!doFetchNow);
	}, [
		pageNo,
		pageSize,
		productAge,
		productGender,
		productMaterial,
		productBrand,
		productStyle,
		productSize,
		productCategory,
		productColor,
		isSearchBegin,
	]);

	// product mapping with head data
	const filterProductColumnMapping = (productData: any) => {
		return productData?.map((product: any, index: number) => {
			return {
				Image: product?.imageFront,
				Style: product?.productStyle?.styleName,
				Description:
					product?.productStyle?.vendorDescription?.split('.')[0] || 'No description for this product',
				Full_Description: product?.productStyle?.description,
				Color: {
					name: product?.productColor?.name,
					colorSwatch: product?.productColor?.colorSwatch ?? '',
				},
				Size: product?.productSize?.symbol,
				Stock: product.stock ?? 0,
				vendors: product?.vendorProductVariants,
				brand: {
					brandName: product?.productStyle?.brandName,
					styleName: product?.productStyle?.styleName,
				},
				gtin: product.gtin,
			};
		});
	};

	const customColorListJSX = (label: string, colorSwatch: string | undefined) => {
		return (
			<div>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Box mr={10}>
						<Image radius="xl" width={12} height={12} src={colorSwatch || ''} />
					</Box>
					<div>{label}</div>
				</Box>
			</div>
		);
	};

	const handleFilterProducts = (productGtin: string) => {
		const filteredProduct = productsData.filter((product: any) => product.gtin !== productGtin);
		setProductsData(filteredProduct);
		return;
	};
	const getStockByProductVariantIds = async () => {
		setFetchingVariantsStock(true);

		const productVariantIds = productsData.map((p: any) => Number(p.id));

		await getProductVariantsStockMutation.mutateAsync(productVariantIds, {
			onSuccess: (data) => {
				const { data: productsStock } = data;
				const productsStockHash: any = {};

				productsStock.forEach((product: any) => {
					const { id, stock } = product;
					productsStockHash[id] = stock;
				});

				const productsWithUpdatedStock = productsData.map((product: any) => ({
					...product,
					stock: productsStockHash[product.id],
				}));

				setDoFetchStockNow(false);
				setProductsData([...productsWithUpdatedStock]);
				setFetchingVariantsStock(false);
			},
			onError: () => {
				setDoFetchStockNow(false);
			},
		});
	};

	useEffect(() => {
		if (doFetchStockNow) {
			getStockByProductVariantIds();
		}
	}, [doFetchStockNow]);

	return (
		<>
			<FilterContainer>
				<ProductInventoryTitle>Product Inventory Search</ProductInventoryTitle>
				<ProductFilterContainer>
					<FilterTitle>Filters</FilterTitle>
					<ProductFilters>
						<Grid gutter="md" align={'flex-end'} className={classes.productFilters}>
							<Grid.Col span={2}>
								<Box mb={6}>Search</Box>
								<InputWrapper
									label=""
									value={searchParam}
									placeholder="Search products"
									handleChange={(e: any) => {
										setPageNo('1');
										setSearchProduct(e.target.value);
									}}
									size="sm"
									className={classes.searchPlace}
								/>
							</Grid.Col>
							<Grid.Col span={2}>
								<Box>
									<Box mb={6}>Color</Box>
									<Box>
										<InfiniteSelectComponent
											value={colors}
											sliceData={sliceMenuData}
											placeholder="Select color"
											isLoading={productColorData.length > 1 ? false : true}
											initialRenderData={
												!!productColorData?.length
													? [
															...productColorData
																.slice(0, sliceMenuData)
																.map((data, index) => ({
																	label: customColorListJSX(
																		data.color,
																		data.colorSwatch
																	),
																	colorSwatch: data?.colorSwatch || '',
																	actualLabel: data.color,
																	value: index,
																})),
													  ]
													: []
											}
											isInitialHasMore={productColorData.length > sliceMenuData}
											data={productColorData.map((data, index) => ({
												label: customColorListJSX(data.color, data.colorSwatch),
												colorSwatch: data?.colorSwatch || '',
												actualLabel: data.color,
												value: index,
											}))}
											onChange={(data: InfiniteOnChangeType) => {
												setPageNo('1');
												setProductColor([...data.map((c) => c.actualLabel || c.label)]);
												setColors([
													...data.map((c) => {
														return {
															label: c.actualLabel || c.label,
															value: c.value,
														};
													}),
												]);
											}}
										/>
									</Box>
								</Box>
							</Grid.Col>
							<Grid.Col span={2}>
								<Box>
									<Box mb={6}>Size</Box>
									<Box>
										<InfiniteSelectComponent
											value={sizes}
											sliceData={sliceMenuData}
											placeholder="Select size"
											isLoading={!!productSizeData.length ? false : true}
											initialRenderData={
												!!productSizeData?.length
													? [
															...productSizeData
																.slice(0, sliceMenuData)
																.map((data, index) => ({
																	label: data,
																	actualLabel: data,
																	value: index,
																})),
													  ]
													: []
											}
											isInitialHasMore={productSizeData.length > sliceMenuData}
											data={
												!!productSizeData?.length
													? productSizeData.map((data, index) => ({
															label: data,
															actualLabel: data,
															value: index,
													  }))
													: []
											}
											onChange={(data: InfiniteOnChangeType) => {
												setPageNo('1');
												setProductSize([...data.map((c) => c.actualLabel || c.label)]);
												setSizes([
													...data.map((c) => {
														return {
															label: c.actualLabel || c.label,
															value: c.value,
														};
													}),
												]);
											}}
										/>
									</Box>
								</Box>
							</Grid.Col>
							{/* <Grid.Col span={2}>
								<MultiSelectComponent
									cdata={productStyleData}
									label={style.label}
									placeholder={style.placeholder}
									handleChange={(style: any) => setProductStyle([...style])}
								/>
							</Grid.Col> */}
							<Grid.Col span={2}>
								<Box>
									<Box mb={6}>Category</Box>
									<Box>
										<InfiniteSelectComponent
											value={categories}
											sliceData={sliceMenuData}
											placeholder="Select category"
											isLoading={!!productCategoryData.length ? false : true}
											initialRenderData={
												!!productCategoryData?.length
													? [
															...productCategoryData.map((data, index) => ({
																label: data,
																actualLabel: data,
																value: index,
															})),
													  ]
													: []
											}
											isInitialHasMore={false}
											data={
												!!productCategoryData?.length
													? productCategoryData.map((data, index) => ({
															label: data,
															actualLabel: data,
															value: index,
													  }))
													: []
											}
											onChange={(data: InfiniteOnChangeType) => {
												setPageNo('1');
												setProductCategory([...data.map((c) => c.actualLabel || c.label)]);
												setCategories([
													...data.map((c) => {
														return {
															label: c.actualLabel || c.label,
															value: c.value,
														};
													}),
												]);
											}}
										/>
									</Box>
								</Box>
							</Grid.Col>
							<Grid.Col span={2}>
								<Box>
									<div style={{ marginBottom: '8px' }}>Minimum Qty</div>
									<NumberInput
										height={44}
										value={minimumQuantity}
										onChange={setMinimumQuantity}
										placeholder="Qty"
										className={classes.minimumQtyBtn}
										min={0}
									/>
								</Box>
							</Grid.Col>
							<Grid.Col span={1}>
								<Button
									size={'sm'}
									className={classes.submitButton}
									onClick={() => setIsSearchBegin(!isSearchBegin)}
								>
									Search
								</Button>
							</Grid.Col>
						</Grid>
					</ProductFilters>
				</ProductFilterContainer>
				<ProductContainer>
					<ProductSideBarContainer>
						<ProductSideBarFilter>
							<Box>
								<Box mb={6}>Brand</Box>
								<Box>
									<InfiniteSelectComponent
										value={brands}
										sliceData={sliceMenuData}
										placeholder="Select brand"
										className="globalInfiniteScrollCustom1"
										isLoading={!!productBrandData.length ? false : true}
										initialRenderData={
											!!productBrandData?.length
												? [
														...productBrandData.map((data, index) => ({
															label: data,
															actualLabel: data,
															value: index,
														})),
												  ]
												: []
										}
										isInitialHasMore={false}
										data={
											!!productBrandData?.length
												? productBrandData.map((data, index) => ({
														label: data,
														actualLabel: data,
														value: index,
												  }))
												: []
										}
										onChange={(data: InfiniteOnChangeType) => {
											setPageNo('1');
											setProductBrand([...data.map((c) => c.actualLabel || c.label)]);
											setBrands([
												...data.map((c) => {
													return {
														label: c.actualLabel || c.label,
														value: c.value,
													};
												}),
											]);
										}}
									/>
								</Box>
							</Box>
							<Box>
								<Box mb={6}>Age</Box>
								<Box>
									<InfiniteSelectComponent
										value={age}
										sliceData={sliceMenuData}
										placeholder="Select age"
										className="globalInfiniteScrollCustom2"
										isLoading={!!ageData.data.length ? false : true}
										initialRenderData={
											!!ageData?.data.length
												? [
														...ageData?.data.map((data, index) => ({
															label: data,
															actualLabel: data,
															value: index,
														})),
												  ]
												: []
										}
										isInitialHasMore={false}
										data={
											!!ageData.data?.length
												? ageData.data.map((data, index) => ({
														label: data,
														actualLabel: data,
														value: index,
												  }))
												: []
										}
										onChange={(data: InfiniteOnChangeType) => {
											setPageNo('1');
											setProductAge([...data.map((c) => c.actualLabel || c.label)]);
											setAge([
												...data.map((c) => {
													return {
														label: c.actualLabel || c.label,
														value: c.value,
													};
												}),
											]);
										}}
									/>
								</Box>
							</Box>
							<Box>
								<Box mb={6}>Gender</Box>
								<Box>
									<InfiniteSelectComponent
										value={gender}
										sliceData={sliceMenuData}
										placeholder="Select gender"
										className="globalInfiniteScrollCustom3"
										isLoading={!!genderData.data.length ? false : true}
										initialRenderData={
											!!genderData?.data.length
												? [
														...genderData?.data.map((data, index) => ({
															label: data,
															actualLabel: data,
															value: index,
														})),
												  ]
												: []
										}
										isInitialHasMore={false}
										data={
											!!genderData.data?.length
												? genderData.data.map((data, index) => ({
														label: data,
														actualLabel: data,
														value: index,
												  }))
												: []
										}
										onChange={(data: InfiniteOnChangeType) => {
											setPageNo('1');
											setProductGender([...data.map((c) => c.actualLabel || c.label)]);
											setGender([
												...data.map((c) => {
													return {
														label: c.actualLabel || c.label,
														value: c.value,
													};
												}),
											]);
										}}
									/>
								</Box>
							</Box>
							<Box>
								<Box mb={6}>Material</Box>
								<Box>
									<InfiniteSelectComponent
										value={material}
										sliceData={sliceMenuData}
										placeholder="Select material"
										className="globalInfiniteScrollCustom4"
										isLoading={!!materialData.data.length ? false : true}
										initialRenderData={
											!!materialData?.data.length
												? [
														...materialData?.data.map((data, index) => ({
															label: data,
															actualLabel: data,
															value: index,
														})),
												  ]
												: []
										}
										isInitialHasMore={false}
										data={
											!!materialData.data?.length
												? materialData.data.map((data, index) => ({
														label: data,
														actualLabel: data,
														value: index,
												  }))
												: []
										}
										onChange={(data: InfiniteOnChangeType) => {
											setPageNo('1');
											setProductMaterial([...data.map((c) => c.actualLabel || c.label)]);
											setMaterial([
												...data.map((c) => {
													return {
														label: c.actualLabel || c.label,
														value: c.value,
													};
												}),
											]);
										}}
									/>
								</Box>
							</Box>
						</ProductSideBarFilter>
					</ProductSideBarContainer>
					<ProductsTableContainer>
						{isFetching ? (
							<div
								style={{
									display: 'flex',
									height: '100%',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Loader size="md" variant="dots" />
							</div>
						) : (
							<TableComponent
								striped={true}
								verticalSpacing="xs"
								horizontalSpacing="sm"
								minimumQty={minimumQuantity}
								tableHead={tableData.tableHead}
								handleFilterProducts={handleFilterProducts}
								tableBodyData={filterProductColumnMapping(productsData)}
								fetchingVariantsStock={fetchingVariantsStock}
							/>
						)}
					</ProductsTableContainer>
				</ProductContainer>
			</FilterContainer>
			<Grid className={classes.pagination}>
				<NumberInput
					size="sm"
					radius="md"
					min={5}
					defaultValue={25}
					value={Number(pageSize)}
					onChange={(size) => {
						if (size) {
							if (size === 0) {
								setPageSize('25');
							} else {
								setPageSize(String(size));
							}
						} else if (size === undefined) {
							setPageSize('25');
						}
					}}
					placeholder="set Page Number"
				/>
				<Pagination
					mr={6}
					ml={6}
					size={'xs'}
					total={Math.ceil(totalProducts / parseInt(pageSize))}
					page={parseInt(pageNo)}
					onChange={(number) => setPageNo(String(number))}
					initialPage={1}
				/>
				<NumberInput
					size="sm"
					radius="md"
					defaultValue={1}
					min={1}
					max={Math.floor(totalProducts / parseInt(pageSize))}
					value={Number(pageNo)}
					onChange={(number) => {
						if (number) {
							if (number > Math.floor(totalProducts / parseInt(pageSize))) {
								let parsedNumber = String(Math.floor(totalProducts / parseInt(pageSize)));
								setPageNo(parsedNumber);
							} else if (number === 0) {
								setPageNo('1');
							} else {
								setPageNo(String(number));
							}
						} else if (number == undefined) {
							setPageNo('1');
						}
					}}
					placeholder="set Page Number"
				/>{' '}
			</Grid>
		</>
	);
}
