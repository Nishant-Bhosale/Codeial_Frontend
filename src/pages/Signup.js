import { useState } from "react"
import { useToasts } from "react-toast-notifications";
import { useNavigate, Navigate } from "react-router-dom";
import styles from "../styles/login.module.css";
import { useAuth } from "../hooks";


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signingUp, setSigningUp] = useState('');
    const { addToast } = useToasts();
    const auth = useAuth();
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSigningUp(true);
        console.log(typeof password)
        let error = false;
        if(!name || !password || !email || !confirmPassword){
            addToast('Please fill all the fields', {
                appearance: 'error',
                autoDismiss: true,
            });
            error=true;
        }

        if(password !== confirmPassword){
            addToast('Password and Confirm Password do not match!', {
                appearance: 'error',
                autoDismiss: true,
            });
            error = true;
        }

        if(error){
            return setSigningUp(false);
        }

        const response = await auth.signup(name, email, password, confirmPassword);

        if(response.success){
            navigate('/login');
            setSigningUp(false);

            return addToast('User registered sucessfully, Please login now', {
                appearance: 'success',
                autoDismiss: true,
            });
        } else{
            addToast(response.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }

        setSigningUp(false);
    };

    if(auth.user){
        return <Navigate to="/"/>
    }

    return (
        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
            <span className={styles.loginSignupHeader}>Signup</span>

            <div className={styles.field}>
                <input 
                    placeholder="Name"
                    type="text"
                    //required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete = "new-password"
                />
            </div>

            <div className={styles.field}>
                <input 
                    placeholder="Email"
                    type="text"
                    //required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete = "new-password"
                />
            </div>

            <div className={styles.field}>
                <input 
                    placeholder="Password"
                    type="password"
                    //required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <input 
                    placeholder="Confirm Password"
                    type="password"
                    //required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <button disabled={signingUp}>
                    {signingUp ? 'Signing Up' : 'Sign up'}
                </button>
            </div>
        </form>
    );
};

export default Signup;