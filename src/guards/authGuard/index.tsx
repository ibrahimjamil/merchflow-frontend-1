import React, { useEffect, useState, createContext } from 'react';
import { Loader } from '@mantine/core';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { 
    QueryFunctionContext,
    QueryObserverResult, 
    useQuery
 } from 'react-query';
import { userApi } from '../../api';

export type UserType = {
	companyName: string;
	createdAt: string;
	email: string;
	error: boolean;
	id: number;
	industryNumber: number;
	type: string;
	updatedAt: string;
	firstName: string;
    lastName: string;
}

export const UserContext = createContext<UserType | null>(null);

const AuthGuard = (props: any) => {
    const router = useRouter();
    const [idToken, setIdToken] = useState('');
    const [allowed, setAllowed] = useState(false);
    const [userState, setUserState] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [accessToken, setAccessToken] = useState('');
    const {
        refetch: refetchUserQuery
      } = useQuery(
        ['getUser', 'user', accessToken, idToken],
        async (params: QueryFunctionContext<string[], any>) => {
            return await userApi.getUser({
                path: params.queryKey[1],
                idToken: params.queryKey[3],
                accessToken: params.queryKey[2],
            })
        },{
            enabled: false,
        }
    )
    
    useEffect(() => {
        if (!!accessToken.length && !!idToken.length) {
            const fetchQuery = async () => {
                const userInfo: QueryObserverResult<AxiosResponse<any, any>, any> =
                 await refetchUserQuery();
                if(userInfo.data?.data && userInfo.data?.status === 200){
                    setUserState(userInfo.data?.data);
                    setIsLoading(false);
                    setAllowed(true);
                    if(userInfo.data?.data?.industryNumber){
                        localStorage.setItem('industryNumber', userInfo.data?.data?.industryNumber);
                    }
                }else if(
                        !!userInfo?.error?.response?.data?.tokenExpired ||
                        userInfo?.error?.response.data === undefined || 
                        !!userInfo?.error?.response?.data?.error
                    ){
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('idToken');
                        localStorage.removeItem('industryNumber');
                        router.push('/login');
                }
            }
            fetchQuery();
        }
    },[accessToken, idToken])

    useEffect(() => {
        const localStorageAccessToken = localStorage.getItem('accessToken');
        const localStorageIdToken = localStorage.getItem('idToken');
        if (!localStorageAccessToken && !localStorageIdToken) {
            router.push('/login');
        }
        localStorageAccessToken && setAccessToken(localStorageAccessToken);
        localStorageIdToken && setIdToken(localStorageIdToken)
    },[])

    if (isLoading){
        return (
            <div style={{
                display: "flex",
                height:"100vh",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <Loader size="xl" variant="dots" />
            </div>
        )
    }

	return (
        <UserContext.Provider value={allowed ? userState : null}>
            {allowed ? 
                <>
                    {props.children(userState)}
                </>
                : ''
            }
        </UserContext.Provider>
	);
};

export default AuthGuard;
