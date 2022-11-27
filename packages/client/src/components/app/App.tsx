import { FC } from 'react';
import { ErrorBoundary } from '../errorBoundary/ErrorBoundary';
import { Nav } from '../nav/Nav';
import { RoutesApp } from '../routes/RoutesApp';
import styles from './App.module.sass';

export const App: FC = () => {
	return (
		<div className={styles.App}>
			<Nav />
			<ErrorBoundary>
				<RoutesApp />
			</ErrorBoundary>
		</div>
	);
};
