import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routes } from '../../assets/routes';
import {  RoutesType } from '../../types/routes';
import { ProtectedRoute } from './ProtectedRoute';

export const RoutesApp: FC = () => {
	const childrenElements:RoutesType[] = [];

	return (
		<Routes>
			{routes.map((route, index) => {
				if(route.children && route.children?.length > 0) {
					for (const routeElement of route.children) {
						childrenElements.push(routeElement);
					}
				}
				return (
					<Route
						key={`${index}-${route.path}`}
						path={route.path}
						element={route.isAuth
							? <ProtectedRoute children={route.element} />
							: route.element}
					>
					</Route>
				);
			})}

			{childrenElements.map((route, index) => {
				return (
					<Route
						key={`${index}-${route.path}`}
						path={route.path}
						element={route.isAuth
							? <ProtectedRoute children={route.element} />
							: route.element}
					>
					</Route>
				);
			})}
		</Routes>
	);
};
