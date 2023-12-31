import styles from './Avatar.module.css';
import axios from 'axios';
import Navbar from './Navbar';

const Avatar = () => {

    const Avatars = [1, 2, 3, 4];

    const setAvatar = async (index) => {
        try {
            const res = await axios.put('/api/users/updateAvatar', { index: index });
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
                    <h2>Choose your Avatar</h2>
                    <div className={styles.avatars}>
                        {Avatars.map((img, index) => {
                            return <img key={img} src={`/profileAvatar/avatar${index + 1}.png`} alt={index + 1} width={100} onClick={() => setAvatar(index + 1)} />
                        })}
                    </div>
                </div>
            </div >
        </>
    );
};


export default Avatar;