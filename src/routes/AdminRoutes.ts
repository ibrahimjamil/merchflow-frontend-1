import {AdminDashboard} from "../container/Admin/AdminDashboard";

export const BASE_URL = '/app/admin';

const AdminRoutes = [
	{
		path: BASE_URL,
		title: 'Admin Dashboard',
		component: AdminDashboard,
	},
];

export default AdminRoutes;
