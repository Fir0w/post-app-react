import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';
import useAuth from './useAuthContext';
import { validateEmail, validatePassword } from '../utils/validateInput';


const Login = () => {

    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [invalid, setInvalid] = useState(false);

    const { dispatch } = useAuth();

    const navigate = useNavigate();

    const onSubmitHandler = (event) => {

        event.preventDefault();
        postResponse();
    };

    const postResponse = async () => {

        const formData = { email: inputEmail, password: inputPassword };

        if (validateEmail(inputEmail) && validatePassword(inputPassword)) {
            try {
                const res = await axios.post('/api/users/auth', formData);
                dispatch({ type: 'LOGIN', payload: res.data });
                localStorage.setItem('user', JSON.stringify(res.data))
                navigate("/home");
            } catch (err) {
                console.log(err);
                setInvalid(true);
            }
        } else setInvalid(true);
    };


    return (
        <div className={styles.login}>
            <a className={styles.home} href="/">
                <img src="/logo.png" width={100} alt="Post react logo" />
                <h2>Post React App</h2>
            </a>
            <div className={styles.loginContainer}>
                <h1 className={styles.containerTitle}>Login</h1>
                <div className={styles.inputContainer}>
                    <form onSubmit={onSubmitHandler} noValidate >
                        <label htmlFor="email">
                            <span>Email: </span>
                            <input value={inputEmail} type="email" id="email" placeholder='Email' autoComplete='on' onChange={(e) => setInputEmail(e.target.value)} />
                        </label>
                        <label htmlFor="password">
                            <span>Password: </span>
                            <input value={inputPassword} type="password" id="password" placeholder='Password' autoComplete='on' minLength={8} maxLength={16} onChange={(e) => setInputPassword(e.target.value)} />
                        </label>
                        {invalid && <p className={styles.invalid}>Invalid email or Password</p>}
                        <button className={styles.button} type='submit'>Submit</button>
                    </form>
                    <p className={styles.signup}>Don&#39;t have an account?</p>
                    <a href="/signup">Create account</a>
                </div>
            </div>
        </div>
    );
};


export default Login;