import React from 'react';
import { Route, Switch as Routes } from 'react-router-dom';
import AdminRoutes from '../../routes/AdminRoutes';
import { MantineProvider } from '@mantine/core';

function Admin() {
	return (
		<MantineProvider
			theme={{
				fontFamily:
					'-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
				spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
			}}
		>
			<Routes>
				{AdminRoutes.map((adminRoute, index) => {
					const Component: React.FunctionComponent = adminRoute.component;
					return (
						<Route key={index} path={adminRoute.path}>
							<Component />
						</Route>
					);
				})}
			</Routes>
		</MantineProvider>
	);
}

export default Admin;
