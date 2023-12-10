import { useNavigate } from "react-router-dom";
import styles from './index.module.css';


const Index = () => {

    const navigate = useNavigate();


    return (
        <div className={styles.index} >
            <div>
                <h1>Welcome to React Post App</h1>
                <img className={styles.logo} src="/logo.png" alt="Post react logo" />
                <h3>Vite.js(React) + Node.js(express) + MongoDb</h3>
                <button className={styles.button} onClick={() => navigate('/login')} >Login</button>
                <button className={styles.button} onClick={() => navigate('/signup')} >Sign up</button>
            </div>
        </div>
    );
};

export default Index;