import { FC, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { redirectUri } from '../../assets/config';
import { Button } from '../../components/UI-elements/Button/Button';
import { authorizationStore } from '../../store/Authorization';
import { RoutePaths } from '../../types/routes';
import styles from './Landing.module.sass';

export const Landing: FC = () => {
	const location = useLocation();

	const sendServiceId = (code: string) => {
		const data: string = JSON.stringify(
			{
				'code': code,
				'redirect_uri': redirectUri
			});

		return authorizationStore.oAuth(data);
	};

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const code: string | null = params.get('code');

		if (code) {
			sendServiceId(code);
		}
	}, [location]);

	return (
		<section className={styles.landing}>

			<div className={styles.cta}>
				<div className={styles.cta__description}>
					<h1 className={styles.title}>Guess...<br />
						Where<br />
						<span className={styles.title_red}> CHAPAEV </span><br />
						is?
					</h1>
					<p className={styles.subtitle}>
						Chapaev in London is the browser-based strategy game.
						The idea behind the game is simple,
						and playing it is ridiculously fun.
					</p>
					<a href={'#about'}>
						<Button type={'button'} variant={'primary'} size={'medium'} value={'Learn More'} />
					</a>
				</div>
				<div className={styles.cta__image} />
			</div>

			<div className={styles.about} id={'about'}>
				<div className={styles.about__game}>
					<h2 className={styles.about__title}>About the game</h2>

					<p className={styles.about__description}>
						The game was developed by the Team London of students of the Middle front-end developer course
						provided by
						Yandex Practicum. <br />
						The following technologies were used: React, TypeScript, Canvas API, React Router, MobX,
						WebWorkers API,
						Docker and some more.
					</p>

					<h2 className={styles.about__title}>Want to play?</h2>
					<Link to={RoutePaths.GAME}>
						<Button type={'button'} variant={'secondary'} size={'large'} value={'Let\'s GO!'} />
					</Link>
				</div>
				<div className={styles.about__leaderboard}><br />Leaderboard will be here soon</div>
			</div>
		</section>
	);
};
