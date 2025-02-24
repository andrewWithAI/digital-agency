'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContent}>
        <a href="/" className={styles.logo}>
          Thompson Digital
        </a>
        {/* Desktop Navigation */}
        <nav className={styles.desktopNavigation}>
          <a href="/services" className={styles.navLink}>Services</a>
          <a href="/about" className={styles.navLink}>About</a>
          <a href="/portfolio" className={styles.navLink}>Portfolio</a>
          <a href="/blog" className={styles.navLink}>Blog</a>
          <a href="/contact" className={styles.navLink}>Contact</a>
        </nav>
        <button 
          className={`${styles.mobileMenuButton} ${isMenuOpen ? styles.mobileMenuButtonOpen : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburger}>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </span>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-modal={isMenuOpen}
      >
        <nav className={styles.mobileNavigation}>
          <a href="/services" className={styles.mobileNavLink} onClick={toggleMenu}>Services</a>
          <a href="/about" className={styles.mobileNavLink} onClick={toggleMenu}>About</a>
          <a href="/portfolio" className={styles.mobileNavLink} onClick={toggleMenu}>Portfolio</a>
          <a href="/blog" className={styles.mobileNavLink} onClick={toggleMenu}>Blog</a>
          <a href="/contact" className={styles.mobileNavLink} onClick={toggleMenu}>Contact</a>
        </nav>
      </div>
    </header>
  );
}