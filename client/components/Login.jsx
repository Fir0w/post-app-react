import { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';

const Login = () => {

    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);


    const onSubmitHandler = (event) => {
        event.preventDefault();
        postResponse();
    };

    const postResponse = async () => {
        const formData = { email: inputEmail, password: inputPassword }
        try {
            const res = await axios.post('/api/login', formData);
            console.log(res);
        } catch (err) { console.log(err); }
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

        if (regex.test(email)) {
            setValidEmail(false);
        } else setValidEmail(true);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

        if (regex.test(password)) {
            setValidPassword(false);
        } else setValidPassword(true);
    };


    return (
        <>
            <a className={styles.home} href="/">
                <img src="/logo.png" width={100} alt="" />
                <h2>Post React App</h2>
            </a>
            <div className={styles.loginContainer}>
                <h1>Login</h1>
                <div className={styles.inputContainer}>
                    <form onSubmit={onSubmitHandler}>
                        <label htmlFor="email">
                            <span>Email: </span>
                            <input value={inputEmail} type="email" id="email" placeholder='Email' autoComplete='on' onChange={(e) => setInputEmail(e.target.value)} onBlur={(e) => validateEmail(e.target.value)} />
                            {validEmail && <p className={styles.invalid}>Invalid email</p>}
                        </label>
                        <label htmlFor="password">
                            <span>Password: </span>
                            <input value={inputPassword} type="password" id="password" placeholder='Password' autoComplete='on' minLength={8} maxLength={16} onChange={(e) => setInputPassword(e.target.value)} onBlur={(e) => validatePassword(e.target.value)} />
                            {validPassword && <p className={styles.invalid}>Invalid Password</p>}
                        </label>
                        <button type='submit'>Submit</button>
                    </form>
                    <p className={styles.signup}>Don&#39;t have an account?</p>
                    <a href="/signup">Create account</a>
                </div>
            </div>
        </>
    )
};

export default Login;