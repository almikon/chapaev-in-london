import { Link } from 'react-router-dom'
import styles from './nav.module.sass'

export function Nav(){
    return(
        <div className={styles.nav}>
            <div className="nav__side">
                <Link className={styles.nav__el} to={'/sign-in'}>Home</Link>
                <Link className={styles.nav__el} to={'/game'}>Play</Link>
                <Link className={styles.nav__el} to={'/forum'}>Forum</Link>
            </div>
            <div className="nav__center"><p className={styles.title}>CHAPAEV<br></br>in London</p></div>
            <div className="nav__side">
                <Link className={styles.nav__el} to={'/leaderboard'}>Leaderboard</Link>
                <Link className={styles.nav__el} to={'/profile'}>Profile</Link>
            </div>
        </div>

    )
}