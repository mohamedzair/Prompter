import React from 'react';
import styles from './Navbar.module.css'
import logoImage from './../../assets/logo1.png';
const Navbar = () => {
  return (
    <nav className={styles.navbar}>

      <div className={styles.logoWrapper}>
        <img src={logoImage} alt="Prompter Logo" className={styles.logo} />
      </div>

      <div className={styles.rightSection}>
        <a href="#" className={styles.navButton}>Get Extension</a>
      </div>
    </nav>
  )
}

export default Navbar
