import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import styles from "../styles/login.module.css";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const { addToast } = useToasts();
    const auth = useAuth();
    //console.log(auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoggingIn(true);
        if(!email || !password){
            addToast('Please enter both email and Password', {
                appearence: 'error',
            });
        }

        const response = await auth.login(email, password);

        if(response.success){
            addToast('Successfully Logged In', {
                appearence: 'success',
            });
        }else {
            addToast(response.message, {
                appearence: 'error',
            });
        }

        setLoggingIn(false);
        //console.log(loggingIn);
    };

    if(auth.user){
        return <Navigate to="/"/>
    }

    return(
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <span className={styles.loginSignupHeader}>Log In</span>

            <div className={styles.field}>
                <input 
                type="email" 
                placeholder="Email"  
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <button disabled={loggingIn}>{loggingIn ? 'Logging In...' : 'Log In'}</button>
            </div>
        </form>
    );
};

export default Login;