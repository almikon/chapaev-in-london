import { FC, PropsWithChildren, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { stores } from '../../store';

type ProtectedRouteProps = PropsWithChildren;

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
	const user = stores.authorization.user;
	const navigate: NavigateFunction = useNavigate();

	useEffect(() => {
		stores.authorization.isLogin(navigate);
	}, [user]);

	return <> {children} </>;
};
