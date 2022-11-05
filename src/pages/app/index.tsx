import React from 'react';
import Head from 'next/head';
import {
	BrowserRouter as Router,
	Switch as Routes,
	Route,
	Redirect
 } from 'react-router-dom';
import AuthGuard from '../../guards/authGuard';
import Admin from '../../container/Admin';
import { links } from '../../utils/data';
import { GenericHeader } from '../../components';


type UserType = {
	companyName: string;
	createdAt: string;
	email: string;
	error: boolean;
	id: number;
	industryNumber: number;
	type: string;
	updatedAt: string;
	username: string;
}


const AppIndex = () => {

	return (
		<Router>
			<Head>
        		<title>Merchflow</title>
      		</Head>
			<AuthGuard>
				{(user: UserType)=>{
					return (
						<Routes>
							<Route key="admin" path={'/app/admin'}>
								<>
									<GenericHeader links={links}/>
									<Admin/>
								</>
							</Route>
							<Redirect
								to={'/app/admin'}
							/>
						</Routes>
					);
				}}
			</AuthGuard>
		</Router>
	);
};

export default AppIndex;
