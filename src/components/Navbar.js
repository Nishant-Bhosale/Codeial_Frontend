import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import styles from "../styles/navbar.module.css";

const Navbar = () => {

    const auth = useAuth();
    return(
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to="/">
                    <img 
                        alt="Codedial"
                        src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                     />
                </Link>
            </div>

            <div className={styles.rightNav}>
            {auth.user && (
                    <div className={styles.user}>
                        <Link to="/settings">
                            <img
                                src="../assets/man.png"
                                alt="Profile Photo"
                                className={styles.userDp}
                            />
                        </Link>
                        <span>{auth.user.name}</span>
                    </div>
            )}
                

                <div className={styles.navLinks}>
                    <ul>
                        {auth.user ? (<>
                            <li onClick={auth.logout}>
                                Log Out
                            </li>
                        </>) : (<>
                            <li>
                                <Link to="/login">Log In </Link>
                            </li>
                        
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>)}
                        
                    </ul>
                </div>
            </div>
        </div>
   );
};

export default Navbar;