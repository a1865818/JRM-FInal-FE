import { Routes } from "@config/routes";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";

const IssuesPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch('https://prolog-api.profy.dev/content-page/home');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPageData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEmailApp = () => {
    window.location.href = "mailto:junotalents@gmail.com";
    closeModal();
  };

  // Get hero section from the sections array
  const heroSection = pageData?.sections?.find(section => section.sectionType === 'hero');
  console.log(heroSection.image.src);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/logo-large.svg" alt="Prolog logo" className={styles.logo} /> 
        </div>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <a href={Routes.home} className={styles.navLink}>Home</a>
          <a href={Routes.products} className={styles.navLink}>Products</a>
          <a href={Routes.documentation} className={styles.navLink}>Documentation</a>
          <a href={Routes.pricing} className={styles.navLink}>Pricing</a>
        </nav>
        
        <a href={Routes.projects} className={styles.dashboardButton}>Open Dashboard</a>
        
        {/* Mobile Menu Toggle */}
        <button 
          className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ''}`} 
          onClick={toggleMenu}
        >
          <div className={styles.hamburger}></div>
        </button>
      </header>
            {/* Hero Section */}
      <section className={styles.heroSection}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : error ? (
          <div className={styles.error}>Error: {error}</div>
        ) : heroSection && (
          <>
            <h1 className={styles.heroTitle}>{heroSection.title}</h1>
            <p className={styles.heroSubtitle}>{heroSection.subtitle}</p>
            
            <div className={styles.heroImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={heroSection.image.src} 
                alt="Dashboard preview" 
                className={styles.dashboardImage}
                width={heroSection.image.width}
                height={heroSection.image.height}
              />
            </div>
          </>
        )}
      </section>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
        <nav className={styles.mobileNavLinks}>
          <a href={Routes.home} className={styles.mobileNavLink}>Home</a>
          <a href={Routes.products} className={styles.mobileNavLink}>Products</a>
          <a href={Routes.documentation} className={styles.mobileNavLink}>Documentation</a>
          <a href={Routes.pricing} className={styles.mobileNavLink}>Pricing</a>
          <a href={Routes.projects} className={styles.mobileDashboardButton}>Open Dashboard</a>
        </nav>
      </div>


      {/* Contact Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalIcon}>
              <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 0H3C1.35 0 0.015 1.35 0.015 3L0 21C0 22.65 1.35 24 3 24H27C28.65 24 30 22.65 30 21V3C30 1.35 28.65 0 27 0ZM27 6L15 13.5L3 6V3L15 10.5L27 3V6Z" fill="#2A254B"/>
              </svg>
            </div>
            <h2 className={styles.modalTitle}>Contact Us Via Email</h2>
            <p className={styles.modalText}>
              Any questions? Send us an email at junotalents@gmail.com.
              <br />
              We usually answer within 24 hours.
            </p>
            <div className={styles.modalActions}>
              <button 
                className={styles.modalButtonCancel} 
                onClick={closeModal}
              >
                Cancel
              </button>
              <button 
                className={styles.modalButtonEmail} 
                onClick={openEmailApp}
              >
                Open Email App
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className={styles.contactButton}
        onClick={openModal}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </button>
    </div>
  );
};

export default IssuesPage;
