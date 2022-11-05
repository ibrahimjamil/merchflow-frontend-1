import { memo, useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import { productApi } from '../../../api';

type VendorProductStyleNameProps = {
	vendorProductStyleId: number;
};

const VendorProductStyleName = ({ vendorProductStyleId }: VendorProductStyleNameProps) => {
	const [loading, setLoading] = useState(true);
	const [styleName, setStyleName] = useState(null);

	useEffect(() => {
		const fetchQuery = async () => {
			const styleData = await productApi.getProductStyleName(vendorProductStyleId);
			setLoading(false);
			setStyleName(styleData.data?.styleName);
		};
		fetchQuery();
	});

	return <div>{loading ? <Loader size="md" variant="dots" /> : <span>{styleName}</span>}</div>
};

export default memo(VendorProductStyleName);
