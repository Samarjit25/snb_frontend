import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/HomePage.module.scss';
import landingImg from '../assets/landing.png';


// check this part. hardcoded for now
// auth logic should be implemented
const isLoggedIn = localStorage.getItem('userLoggedIn') === 'false';


const Home: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigate = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
    }, 300); 
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/addclass');
    } else {
      alert('Please log in first!');
    }
  };

  return (
    <div className={styles.container}>
      <img src={landingImg} alt="Landing" className={styles.landingImage} />
      <h1 className={styles.title}>Welcome to Class Compass</h1>
      <div className={styles.buttonGroup}>
        <button
          className={styles.primaryButton}
          onClick={ handleGetStarted}
          disabled={loading}
        >
          Get Started
        </button>
        <button
          className={styles.secondaryButton}
          onClick={() => handleNavigate('/login')}
          disabled={loading}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
