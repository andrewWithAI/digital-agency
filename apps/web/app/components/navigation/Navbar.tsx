'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
        <Link href="/" className={styles.logo}>
          Thompson Digital
        </Link>
        {/* Desktop Navigation */}
        <nav className={styles.desktopNavigation}>
          <Link href="/services" className={styles.navLink}>Services</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/portfolio" className={styles.navLink}>Portfolio</Link>
          <Link href="/blog" className={styles.navLink}>Blog</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
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
          <Link href="/services" className={styles.mobileNavLink} onClick={toggleMenu}>Services</Link>
          <Link href="/about" className={styles.mobileNavLink} onClick={toggleMenu}>About</Link>
          <Link href="/portfolio" className={styles.mobileNavLink} onClick={toggleMenu}>Portfolio</Link>
          <Link href="/blog" className={styles.mobileNavLink} onClick={toggleMenu}>Blog</Link>
          <Link href="/contact" className={styles.mobileNavLink} onClick={toggleMenu}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}