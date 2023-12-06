import { useState, useEffect } from "react";
import styles from './Navbar.module.css'

const Navbar = () => {
    const [position, setPosition] = useState(window.scrollY);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            let moving = window.scrollY

            setVisible(position > moving);
            setPosition(moving)
        };
        window.addEventListener("scroll", handleScroll);
        return (() => {
            window.removeEventListener("scroll", handleScroll);
        });
    }, [position]);

    const cls = visible ? styles.visible : styles.hidden;

    return (
        <header className={cls}>
            <div className={styles.Navbar}>

                <a className={styles.home} href="/">
                    <img src="/logo.png" width={100} alt="Post react logo" />
                    <h2>Post React App</h2>
                </a>
                <div className={styles.profile}>
                    <a className={styles.profile} href="">
                        <img className={styles.img} src="https://cdn-icons-png.flaticon.com/512/3899/3899618.png" width={50} alt="flaticon.com" />
                        <p>Profile Name</p>
                    </a>
                    <button>Logout</button>
                </div>
            </div>
        </header>
    )
}

export default Navbar