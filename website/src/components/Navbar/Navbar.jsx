import React from 'react';
import styles from './Navbar.module.css'
import logoImage from './../../assets/logo1.png'; 
const Navbar = () => {
  return (
    <nav className={styles.navbar}>

      <div className={`${styles.navSection} ${styles.logoWrapper}`}>
        <img src={logoImage} alt="Prompter Logo" className={styles.logo} />
      </div>
      <div className={styles.navSection}>
        <a href="" className={styles.navLink}>Get Extention</a>
      </div>
       <div className={styles.navSection}>
    
      </div>
    </nav>
  )
}

export default Navbar
