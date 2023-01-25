import { FC } from 'react';
import { startServiceWorker } from '../../services/ServiceWorker';
import { ErrorBoundary } from '../errorBoundary/ErrorBoundary';
import { Nav } from '../nav/Nav';
import { RoutesApp } from '../routes/RoutesApp';
import styles from './App.module.sass';

export const App: FC = () => {
	startServiceWorker();
	return (
		<div className={styles.App}>
			<Nav />

			<ErrorBoundary>
				<RoutesApp />
			</ErrorBoundary>
		</div>

	);
};
