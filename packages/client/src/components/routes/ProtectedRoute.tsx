import { FC, PropsWithChildren, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { stores }  from '../../store';

type ProtectedRouteProps = PropsWithChildren;

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
	const user = stores.authorizationStore.user;
	const navigate: NavigateFunction = useNavigate();

	useEffect(() => {
		stores.authorizationStore.isLogin(navigate);
	}, [user]);

	return <> {children} </>;
};
