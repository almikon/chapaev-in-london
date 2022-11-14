import { Link } from 'react-router-dom'
import { RoutePaths } from '../../types/routes'
import styles from './nav.module.sass'

export function Nav() {
    return (
        <div className={styles.nav}>
            <div className={styles.nav__side}>
                <Link className={styles.nav__el} to={RoutePaths.SIGN_IN}>Home</Link>
                <Link className={styles.nav__el} to={RoutePaths.MAIN}>Play</Link>
                <Link className={styles.nav__el} to={RoutePaths.FORUM}>Forum</Link>
            </div>
            <div><p className={styles.title}>CHAPAEV<br></br>in London</p></div>
            <div className={styles.nav__side}>
                <Link className={styles.nav__el} to={RoutePaths.LEADERBOARD}>Leaderboard</Link>
                <Link className={styles.nav__el} to={RoutePaths.PROFILE}>Profile</Link>
            </div>
        </div>

    )
}