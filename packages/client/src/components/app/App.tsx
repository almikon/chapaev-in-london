import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { startServiceWorker } from '../../services/ServiceWorker';
import { stores } from '../../store';
import { ErrorBoundary } from '../errorBoundary/ErrorBoundary';
import { Nav } from '../nav/Nav';
import { RoutesApp } from '../routes/RoutesApp';
import styles from './App.module.sass';

export const App: FC = observer(() => {
	const theme = stores.authorizationStore.theme;
	const [userTheme, setUserTheme] = useState(theme);

	useEffect(() => {
		setUserTheme(theme);
	}, [theme]);

	startServiceWorker();
	return (
		<div className={`
			${styles.App}
			${styles[userTheme === 'light' ? 'App_light' : 'App_dark']}
		`}>
			<Nav />

			<ErrorBoundary>
				<RoutesApp />
			</ErrorBoundary>
		</div>

	);
});