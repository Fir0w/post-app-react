import { Link } from 'react-router-dom';
import styles from './Profile.module.css';
import useAuth from './useAuthContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';


const Profile = () => {

    const [profile, setProfile] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {

        try {
            const res = await axios.get(`/api/users/user?username=${location.pathname.substring(location.pathname.lastIndexOf('/') + 1)}`);
            setProfile(res.data);
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <>
            <Navbar />
            <div className={styles.profileContainer}>
                <div className={styles.profileBox}>
                    <div className={styles.profileImg}>
                        <img className={styles.img} src={`/profileAvatar/avatar${profile.profileAvatar}.png`} alt="flaticon.com" />
                        <p>{profile.username}</p>
                        {user.username === location.pathname.substring(location.pathname.lastIndexOf('/') + 1) && <Link to={`${location.pathname}/avatar`}>
                            <button className={styles.button}>Edit profile Avatar</button>
                        </Link>}
                    </div>
                    <div className={styles.profileInformation}>
                        <div className={styles.stat}>
                            <p>
                                Rating
                            </p>
                            <p>0</p>
                        </div>
                        <div className={styles.stat}>
                            <p>
                                posts
                            </p>
                            <p>0</p>
                        </div>
                        <div className={styles.stat}>
                            <p>
                                comments
                            </p>
                            <p>0</p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};


export default Profile;