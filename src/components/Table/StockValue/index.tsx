import { Loader } from '@mantine/core';
import { memo, useEffect, useState } from 'react';
import { productApi } from '../../../api';

type StockValueProps = {
	id: number;
    handleNewStockValue: (num: number) => void;
};

const StockValue = ({ id, handleNewStockValue }: StockValueProps) => {
	const [loading, setLoading] = useState(true);
	const [stock, setStock] = useState(null);

	useEffect(() => {
		const fetchQuery = async () => {
			const stockInfo = await productApi.getProductStock(id);
			setLoading(false);
			setStock(stockInfo.data?.stock);
            handleNewStockValue(stockInfo.data?.stock);
		};
		fetchQuery();
	});

	return <div>{loading ? <Loader size="md" variant="dots" /> : <span>{stock}</span>}</div>;
};

export default memo(StockValue);
