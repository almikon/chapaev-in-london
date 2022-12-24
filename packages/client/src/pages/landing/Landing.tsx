import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { redirectUri } from '../../assets/config';
import { getQueryStringParams } from '../../assets/utils/getQueryStringParams';
import { Button } from '../../components/UI-elements/Button/Button';
import { stores } from '../../store';
import { User } from '../../types/dto/user.dto';
import { RoutePaths } from '../../types/routes';
import styles from './Landing.module.sass';

export const Landing: FC = () => {

	const [user, setUser] = useState<User>();

	const getUser = () => {
		return fetch('https://ya-praktikum.tech/api/v2/auth/user/', {
			credentials: 'include'
		}).then(r => (r.json()))
			.then(res => setUser(res))
			.catch(e => console.log(e));
	};

	const sendServiceId = (code: string) => {
		return fetch('https://ya-praktikum.tech/api/v2/oauth/yandex/', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				{
					'code': code,
					'redirect_uri': redirectUri
				})
		}).then(r => r);
	};

	useEffect(() => {
		const codeFromParams: Record<string, string> = getQueryStringParams(location.search);

		if (codeFromParams.code) {
			console.log(codeFromParams.code);
			sendServiceId(codeFromParams.code).then(() => getUser());
		}
	}, [location]);

	useEffect(() => {
		if (user && user.id) {
			stores.authorizationStore.OAUth(user);
		}
	}, [user]);

	return (
		<section className={styles.landing}>

			<div className={styles.cta}>
				<div className={styles.cta__description}>
					<h1 className={styles.title}>Guess...<br/>
              Where<br/>
						<span className={styles.title_red}> CHAPAEV </span><br/>
              is?
					</h1>
					<p className={styles.subtitle}>
              Chapaev in London is the browser-based strategy game.
              The idea behind the game is simple,
              and playing it is ridiculously fun.
					</p>
					<a href={'#about'}>
						<Button type={'button'} variant={'primary'} size={'medium'} value={'Learn More'}/>
					</a>
				</div>
				<div className={styles.cta__image}/>
			</div>

			<div className={styles.about} id={'about'}>
				<div className={styles.about__game}>
					<h2 className={styles.about__title}>About the game</h2>

					<p className={styles.about__description}>
              The game was developed by the Team London of students of the Middle front-end developer course provided by
              Yandex Practicum. <br/>
              The following technologies were used: React, TypeScript, Canvas API, React Router, MobX, WebWorkers API,
              Docker and some more.
					</p>

					<h2 className={styles.about__title}>Want to play?</h2>
					<Link to={RoutePaths.GAME}>
						<Button type={'button'} variant={'secondary'} size={'large'} value={'Let\'s GO!'}/>
					</Link>
				</div>
				<div className={styles.about__leaderboard}><br/>Leaderboard will be here soon</div>
			</div>
		</section>
	);
};
