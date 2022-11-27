import React, { PropsWithChildren } from 'react';
import { RoutePaths } from '../../types/routes';
import { Catch } from './Catch';
import styles from './ErrorBoundary.module.sass';

type ErrorBoundaryProps = PropsWithChildren;

export const ErrorBoundary = Catch(
	(props: ErrorBoundaryProps, error?: Error) => {
		if (error) {
			return (
				<div className={styles.errorBoundary}>
					<div className={styles.errorBoundary__description}>
						<h2>Все пройдет, и ошибка тоже.</h2>
						<a href={RoutePaths.MAIN}>
              Можете вернуться на главный экран и продолжить
						</a>
					</div>
					<details className={styles.errorBoundary__details}>
						<summary>Хочу знать что случилось</summary>
						<h4>{error.message}</h4>
						<p>
							{' '}
              Если коротко: - Бла бла бла, сломалось отображение. Бла бла бла
              исправим{' '}
						</p>
					</details>
				</div>
			);
		} else {
			return <React.Fragment>{props.children}</React.Fragment>;
		}
	}
);
