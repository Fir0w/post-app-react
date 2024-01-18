import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './Navbar.module.css';
import useAuth from './useAuthContext';


const Navbar = () => {

    const [position, setPosition] = useState(window.scrollY);
    const [visible, setVisible] = useState(true);

    const { dispatch, user } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            let moving = window.scrollY;

            setVisible(position >= moving);
            setPosition(moving);
        };
        window.addEventListener("scroll", handleScroll);
        return (() => {
            window.removeEventListener("scroll", handleScroll);
        });
    }, [position]);

    const logout = async () => {

        try {
            await axios.post('/api/users/logout');
            dispatch({ type: 'LOGOUT' });
            localStorage.removeItem('user');
            navigate("/");
        } catch (err) { console.log(err); }
    };

    const cls = visible ? styles.visible : styles.hidden;


    return (
        <header className={cls}>
            <div className={styles.navbar}>
                <a className={styles.home} href="/home">
                    <img className={styles.logo} src="/logo.png" alt="Post react logo" />
                    <h2>Post React App</h2>
                </a>
                <div className={styles.profile}>
                    <a className={styles.profile} href={`/profile/${user.username}`}>
                        <img className={styles.img} src={`/profileAvatar/avatar${user.profileAvatar}.png`} alt="flaticon.com" />
                        <p>{user?.username}</p>
                    </a>
                    <button className={styles.button} onClick={logout}>Logout</button>
                </div>
            </div>
        </header>
    );
};


export default Navbar;