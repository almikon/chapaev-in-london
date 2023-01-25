//@ts-ignore
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../types/routes';
import styles from './nav.module.sass';

export const Nav: FC = () => {
	return (
		<div className={styles.nav}>
			<div className={styles.nav__side}>
				<Link className={styles.nav__el} to={RoutePaths.MAIN}>Home</Link>
				<Link className={styles.nav__el} to={RoutePaths.GAME}>Play</Link>
				<Link className={styles.nav__el} to={RoutePaths.FORUM}>Forum</Link>
			</div>
			<div><p className={styles.title}>CHAPAEV<br/>in London</p></div>
			<div className={styles.nav__side}>
				<Link className={styles.nav__el} to={RoutePaths.LEADERBOARD}>Leaderboard</Link>
				<Link className={styles.nav__el} to={RoutePaths.PROFILE}>Profile</Link>
			</div>
		</div>

	);
};
