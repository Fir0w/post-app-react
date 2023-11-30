// import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import styles from './index.module.css'
// import axios from 'axios'

const Index = () => {

    // const [count, setCount] = useState(0)
    // const [name, setName] = useState('')

    // const getResponse = async () => {
    //     try {
    //         const res = await axios.get('/api')
    //         console.log(res);
    //         setName(res.data.name)
    //     } catch (err)
    //     {console.log(err);}
        
    // };

    const navigate = useNavigate();

    
    return (
        <>
            <h1>Welcome to React Post App</h1>
            <img className={styles.logo} src="/logo.png" alt="" />
            <h3>Vite.js(React) + Node.js(express) + MongoDb</h3>
            <button onClick={() => navigate('/login')} style={{ width: "200px", marginRight: "10px" }}>Login</button>
            <button onClick={() => navigate('/signup')} style={{ width: "200px", marginLeft: "10px" }}>Sign up</button>
        </>
    )
};

export default Index;