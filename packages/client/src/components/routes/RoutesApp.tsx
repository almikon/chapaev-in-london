import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routes } from '../../assets/routes';
import { ProtectedRoute } from './ProtectedRoute';

export const RoutesApp: FC = () => {
	return (
		<Routes>
			{routes.map((route, index) => (
				<Route
					key={`${index}-${route.path}`}
					path={route.path}
					element={
						route.isAuth ? (
							<ProtectedRoute children={route.element} />
						) : (
							route.element
						)
					}
				/>
			))}
		</Routes>
	);
};
