export default {
	PORT: process.env.PORT,
	APP_URL: process.env.APP_URL,
	SESSION_TIME: process.env.SESSION_TIME,
	ACCESS_TOKEN: typeof window !== 'undefined' && localStorage.getItem('accessToken'),
	ID_TOKEN: typeof window !== 'undefined' && localStorage.getItem('idToken'),
};
