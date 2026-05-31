import styles from './styles.module.css';
import { Link } from 'react-router-dom';

const Linker = () => {
    return ( 
        <>
            <div className={styles.linkBox}>
                <div className={styles.title}>
                    <h1>Sell A Home</h1>
                </div>
                <div className={styles.sub}>
                    <Link className={styles.ref}>Request an offer</Link>
                    <Link className={styles.ref}>Pricing</Link>
                    <Link className={styles.ref}>Pricing</Link>
                    <Link className={styles.ref}>Pricing</Link>
                    <Link className={styles.ref}>Pricing</Link>
                </div>
            </div>
        </>
     );
}
 
export default Linker;