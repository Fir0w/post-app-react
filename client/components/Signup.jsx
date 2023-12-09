import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from './Signup.module.css';

const Signup = () => {

    const [inputUserName, setInputUserName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const navigate = useNavigate();

    const onSubmitHandler = (event) => {

        event.preventDefault();
        postResponse();
    };

    const postResponse = async () => {

        const formData = { userName: inputUserName, email: inputEmail, password: inputPassword }

        if (validateEmail(inputEmail) && validatePassword(inputPassword) && validateUsername(inputUserName)) {
            try {
                const res = await axios.post('/api/signup', formData);
                console.log(res);
                navigate("/");
            } catch (err) { console.log(err); }
        }
    };

    const validateEmail = (email) => {

        const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {

        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;
        return regex.test(password);
    };

    const validateUsername = (username) => {

        const regex = /^[a-zA-Z0-9_]{3,10}$/;
        return regex.test(username);
    };


    return (
        <div className={styles.signup}>
            <a className={styles.home} href="/">
                <img src="/logo.png" width={100} alt="Post react logo" />
                <h2>Post React App</h2>
            </a>
            <div className={styles.signupContainer}>
                <h1 className={styles.containerTitle}>Sign up</h1>
                <div className={styles.inputContainer}>
                    <form onSubmit={onSubmitHandler} noValidate >
                        <label htmlFor="userName">
                            <span>Username: </span>
                            <input value={inputUserName} type="text" id="userName" placeholder='Username' autoComplete='on' onChange={(e) => setInputUserName(e.target.value)} onBlur={e => validateUsername(e.target.value) ? setInvalidUsername(false) : setInvalidUsername(true)} />
                            {invalidUsername && <p className={styles.invalid}>Invalid Username</p>}
                        </label>
                        <label htmlFor="email">
                            <span>Email: </span>
                            <input value={inputEmail} type="email" id="email" placeholder='Email' autoComplete='on' onChange={(e) => setInputEmail(e.target.value)} onBlur={e => validateEmail(e.target.value) ? setInvalidEmail(false) : setInvalidEmail(true)} />
                            {invalidEmail && <p className={styles.invalid}>Invalid Email</p>}
                        </label>
                        <label htmlFor="password">
                            <span>Password: </span>
                            <input value={inputPassword} type="password" id="password" placeholder='Password' autoComplete='on' maxLength={16} onChange={(e) => setInputPassword(e.target.value)} onBlur={e => validatePassword(e.target.value) ? setInvalidPassword(false) : setInvalidPassword(true)} />
                            {invalidPassword && <p className={styles.invalid}>Invalid Password</p>}
                        </label>
                        <button className={styles.Button} type='submit'>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Signup;