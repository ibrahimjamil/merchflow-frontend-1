import axios from 'axios';
import { QueryClient } from 'react-query';
import AppConfig from '../../constants/AppConfig';
import { Network } from '../../utils/network';

const client = new QueryClient();
const network = new Network(AppConfig.APP_URL);

type ProductFetchingFiltersType = {
	path: string; // /product
	pageNo: string;
	pageSize: string;
	query: string;
	productSize: string;
	productBrand: string;
	productColor: string;
	productCategory: string;
	minimumQuantity: number;
	ageFilter: string;
	genderFilter: string;
	materialFilter: string;
};

type ProductColorFiltersType = {
	path: string; // /color
};

type ProductStyleFiltersType = {
	path: string; // /style
};

type ProductSizeFiltersType = {
	path: string; // /style
};

type ProductCategoryFiltersType = {
	path: string; // /category
};

type ProductBrandFiltersType = {
	path: string; // /category
};

const getProducts = async (productFetchingFilters: ProductFetchingFiltersType) => {
	return await client.fetchQuery(
		'getProducts',
		async () =>
			await network.get(
				productFetchingFilters.path,
				{
					authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
				{
					pageNo: productFetchingFilters.pageNo,
					pageSize: productFetchingFilters.pageSize,
					query: productFetchingFilters.query,
					ageFilter: productFetchingFilters.ageFilter,
					genderFilter: productFetchingFilters.genderFilter,
					materialFilter: productFetchingFilters.materialFilter,
					productSize: productFetchingFilters.productSize,
					productBrand: productFetchingFilters.productBrand,
					productColor: productFetchingFilters.productColor,
					productCategory: productFetchingFilters.productCategory,
					minimumQuantity: productFetchingFilters.minimumQuantity,
				}
			),
		{
			retry: false,
		}
	);
};

const getProductColors = async (productColorFilters: ProductColorFiltersType) => {
	return await client.fetchQuery(
		'getProductColors',
		async () =>
			await network.get(productColorFilters.path, {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			}),
		{
			retry: false,
		}
	);
};

const getProductStyles = async (productStyleFilters: ProductStyleFiltersType) => {
	return await client.fetchQuery(
		'getProductStyles',
		async () =>
			await network.get(productStyleFilters.path, {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			}),
		{
			retry: false,
		}
	);
};

const getProductSizes = async (productSizeFilters: ProductSizeFiltersType) => {
	return await client.fetchQuery(
		'getProductSizes',
		async () =>
			await network.get(productSizeFilters.path, {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			}),
		{
			retry: false,
		}
	);
};

const getProductCategory = async (productCategoryFilters: ProductCategoryFiltersType) => {
	return await client.fetchQuery(
		'getProductCategory',
		async () =>
			await network.get(productCategoryFilters.path, {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			}),
		{
			retry: false,
		}
	);
};

const getProductBrands = async (productBrandsFilters: ProductBrandFiltersType) => {
	return await client.fetchQuery(
		'getProductBrands',
		async () =>
			await network.get(productBrandsFilters.path, {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			}),
		{
			retry: false,
		}
	);
};

const getProductStock = async (id: number) => {
	return await network.get(`vendor-product/stock/${id}`, {
		authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	});
};

const getProductVariantsStock = async (productsVariantsIds: number[]) => {
	return await axios.post(
		AppConfig.APP_URL + 'product/vendor-products-stock/stock',
		{
			productsVariantsIds,
		},
		{
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		}
	);
};

const getProductStyleName = async (id: number) => {
	return await network.get(`vendor-product/style/${id}`, {
		authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	});
};

const productApi = {
	getProducts,
	getProductColors,
	getProductStyles,
	getProductSizes,
	getProductCategory,
	getProductBrands,
	getProductStock,
	getProductVariantsStock,
	getProductStyleName,
};

export default productApi;
