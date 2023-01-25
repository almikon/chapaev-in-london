import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toggleTheme from '../../public/theme.svg';
import { stores } from '../../store';
import { authorizationStore } from '../../store/Authorization';
import { RoutePaths } from '../../types/routes';
import styles from './nav.module.sass';

export const Nav: FC = observer(() => {
	const theme = stores.authorizationStore.theme;
	const [userTheme, setUserTheme] = useState<any>('');
	const changeTheme = () => {
		authorizationStore.toggleTheme();
	};

	useEffect(() => {
		setUserTheme(theme);
	}, [theme]);

	const themeClassToggle = userTheme === 'light' ? 'nav__el_light' : 'nav__el_dark';

	return (
		<div className={ `
      ${ styles.nav }
      ${ styles[themeClassToggle] }
    ` }>

			<div className={ styles.nav__side }>
				<Link className={ `
        ${ styles.nav__el }
        ${ styles[themeClassToggle] }
        ` } to={ RoutePaths.MAIN }>Home</Link>
				<Link className={ `
        ${ styles.nav__el }
        ${ styles[themeClassToggle] }
        ` } to={ RoutePaths.GAME }>Play</Link>
				<Link className={ `
        ${ styles.nav__el }
        ${ styles[themeClassToggle] }
        ` } to={ RoutePaths.FORUM }>Forum</Link>
			</div>

			<div><p className={ styles.title }>CHAPAEV<br/>in London</p></div>

			<div className={ styles.nav__side }>
				<Link className={ `
        ${ styles.nav__el }
        ${ styles[themeClassToggle] }
        ` } to={ RoutePaths.LEADERBOARD }>Leaderboard</Link>
				<Link className={ `
        ${ styles.nav__el }
        ${ styles[themeClassToggle] }
        ` } to={ RoutePaths.PROFILE }>Profile</Link>
				<img className={ styles.theme } src={ toggleTheme } onClick={ () => changeTheme() }></img>
			</div>

		</div>

	);
});
