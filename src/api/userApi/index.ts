import axios from 'axios';
import { QueryClient } from 'react-query';
import AppConfig from '../../constants/AppConfig';

const client = new QueryClient();

type GetUserQueryType = {
	path: string;
	idToken: string;
	accessToken: string;
};
export type UpdateUserType = {
	firstName?: string;
	lastName?: string;
	companyName?: string;
	industryNumber?: string;
};

type InviteUserMutationType = {
	email: string;
};

const getUser = async (getUserInfo: GetUserQueryType) => {
	return await client.fetchQuery(
		'getUser',
		async () =>
			await axios.get(AppConfig.APP_URL + getUserInfo.path, {
				headers: {
					authorization: `Bearer ${getUserInfo.accessToken}`,
					idToken: getUserInfo.idToken,
				},
			}),
		{
			retry: false,
		}
	);
};

const updateUser = async (updateUserFields: UpdateUserType) => {
	return await axios.patch(AppConfig.APP_URL + 'user/update', updateUserFields, {
		headers: {
			authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			idToken: localStorage.getItem('idToken') as string,
		},
	});
};
const sendInvite = async (inviteFields: InviteUserMutationType) => {
	const accessToken = localStorage.getItem('accessToken');
	const idToken = localStorage.getItem('idToken');
	return await axios.post(
		AppConfig.APP_URL + 'invites/send',
		{
			email: inviteFields.email,
		},
		{
			headers: {
				authorization: `Bearer ${accessToken}`,
				idToken: idToken as string,
			},
		}
	);
};

const userApi = {
	getUser,
	updateUser,
	sendInvite,
};

export default userApi;
