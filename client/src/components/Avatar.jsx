import styles from './Avatar.module.css';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import leftArrow from '../assets/leftArrow.svg';
import useAuth from './useAuthContext';


const Avatar = () => {

    const Avatars = [1, 2, 3, 4];

    const { user } = useAuth();

    const setAvatar = async (index) => {
        try {
            const res = await axios.put('/api/users/updateAvatar', { index });
            let user = JSON.parse(localStorage.getItem('user'));
            user = {
                ...user,
                profileAvatar: res.data.profileAvatar
            }
            localStorage.setItem('user', JSON.stringify(user));
            history.back();
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <>
            <Navbar />
            <div className={styles.profileContainer}>
                <div className={styles.profileBox}>
                    <div className={styles.buttonContainer}>
                        <Link to={`/profile/${user.username}`}>
                            <button className={styles.button}>
                                <img src={leftArrow} alt="leftArrow" />
                            </button>
                        </Link>
                        <h2>Choose your Avatar</h2>
                    </div>
                    <div className={styles.avatars}>
                        {Avatars.map((img, index) => {
                            return <img className={styles.img} key={img} src={`/profileAvatar/avatar${index + 1}.png`} alt={index + 1} width={100} onClick={() => setAvatar(index + 1)} />
                        })}
                    </div>
                </div>
            </div >
        </>
    );
};


export default Avatar;