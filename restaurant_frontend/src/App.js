import React, { useEffect, useMemo, useState, useCallback, createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import './i18n';
import Reservation from './components/Reservation';
import Reviews from './components/Reviews';
import EventPromotion from './components/EventPromotion';
import Newsletter from './components/Newsletter';
import LoyaltyProgram from './components/LoyaltyProgram';
import ChefsSpecial from './components/ChefsSpecial';
import LanguageSelector from './components/LanguageSelector';

/**
 * A simple Theme Context to provide theme state and toggle across the app.
 */
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

// PUBLIC_INTERFACE
function App() {
  /**
   * PUBLIC_INTERFACE
   * Main application entry for the restaurant landing page.
   * Renders: Navbar, Hero, Menu sections, Hours, Contact, Gallery, Map, and Footer.
   * Adds light/dark theming with persistence via localStorage.
   */
  const [theme, setTheme] = useState('light');

  // On mount: Use saved preference or system preference; default to light.
  useEffect(() => {
    const saved = window.localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      return;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  // Apply theme to document element and persist.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  const ctxValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={ctxValue}>
      <div className="App">
        <SkipToContent />
        <Navbar />
        <main id="main-content">
          <Hero />
          <EventPromotion />
          <LoyaltyProgram />
          <Menu />
          <ChefsSpecial />
          <Reviews />
          <Reservation />
          <Details />
          <Gallery />
          <Location />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

function SkipToContent() {
  const { t } = useTranslation();
  
  return (
    <>
      <a className="skip-link" href="#main-content">
        {t('navigation.skip_to_main')}
      </a>
      <a className="skip-link" href="#menu" style={{ left: '140px' }}>
        {t('navigation.skip_to_menu')}
      </a>
      <a className="skip-link" href="#reservation" style={{ left: '250px' }}>
        {t('navigation.skip_to_reservations')}
      </a>
    </>
  );
}

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const icon = theme === 'light' ? '🌙' : '☀️';
  
  return (
    <header className="navbar" role="banner">
      <div className="container nav-inner">
        <div className="brand">
          <span className="logo" aria-hidden="true">🍽️</span>
          <a 
            href="#hero" 
            className="brand-name" 
            aria-label={`${t('brand.name')} Restaurant - Go to top of page`}
          >
            {t('brand.name')}
          </a>
        </div>
        <nav className="nav-links" aria-label="Main navigation" role="navigation">
          <a href="#events" aria-describedby="nav-events-desc">
            {t('navigation.events')}
            <span id="nav-events-desc" className="sr-only">Special events and promotions</span>
          </a>
          <a href="#loyalty" aria-describedby="nav-loyalty-desc">
            {t('navigation.rewards')}
            <span id="nav-loyalty-desc" className="sr-only">Loyalty program and member benefits</span>
          </a>
          <a href="#menu" aria-describedby="nav-menu-desc">
            {t('navigation.menu')}
            <span id="nav-menu-desc" className="sr-only">Food and drink menu</span>
          </a>
          <a href="#chefs-special" aria-describedby="nav-special-desc">
            {t('navigation.chefs_special')}
            <span id="nav-special-desc" className="sr-only">Featured signature dishes</span>
          </a>
          <a href="#reviews" aria-describedby="nav-reviews-desc">
            {t('navigation.reviews')}
            <span id="nav-reviews-desc" className="sr-only">Customer testimonials and ratings</span>
          </a>
          <a href="#reservation" aria-describedby="nav-reservation-desc">
            {t('navigation.reservations')}
            <span id="nav-reservation-desc" className="sr-only">Book a table</span>
          </a>
          <a href="#hours" aria-describedby="nav-hours-desc">
            {t('navigation.hours')}
            <span id="nav-hours-desc" className="sr-only">Opening hours and schedule</span>
          </a>
          <a href="#contact" aria-describedby="nav-contact-desc">
            {t('navigation.contact')}
            <span id="nav-contact-desc" className="sr-only">Contact information and form</span>
          </a>
          <a href="#gallery" aria-describedby="nav-gallery-desc">
            {t('navigation.gallery')}
            <span id="nav-gallery-desc" className="sr-only">Restaurant photos and ambiance</span>
          </a>
          <a href="#location" aria-describedby="nav-location-desc">
            {t('navigation.location')}
            <span id="nav-location-desc" className="sr-only">Address and map</span>
          </a>
          <a href="#newsletter" aria-describedby="nav-newsletter-desc">
            {t('navigation.newsletter')}
            <span id="nav-newsletter-desc" className="sr-only">Subscribe to updates</span>
          </a>
        </nav>
        <div className="nav-controls">
          <LanguageSelector />
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={t('theme.switch_to', { theme: t(`theme.${nextTheme}`) })}
            aria-pressed={theme === 'dark'}
            title={t('theme.switch_to', { theme: t(`theme.${nextTheme}`) })}
          >
            <span aria-hidden="true">{icon}</span>
            <span className="sr-only-focusable">
              {t('theme.current_theme', { theme: t(`theme.${theme}`) })}
            </span>
            <span style={{ fontWeight: 700, fontSize: 12, letterSpacing: 0.3 }}>
              {t(`theme.${theme}`)}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useTranslation();
  
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-content">
          <h1 id="hero-title" className="hero-title">
            {t('hero.title')}
          </h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <div className="hero-actions" role="group" aria-label="Main actions">
            <a 
              href="#menu" 
              className="btn btn-primary"
              aria-describedby="menu-action-desc"
            >
              <span aria-hidden="true">🍽️</span>
              {t('hero.explore_menu')}
              <span id="menu-action-desc" className="sr-only">
                View our full menu with starters, mains, desserts, and drinks
              </span>
            </a>
            <a 
              href="#reservation" 
              className="btn btn-accent" 
              aria-describedby="reservation-action-desc"
            >
              <span aria-hidden="true">📅</span>
              {t('hero.reserve_table')}
              <span id="reservation-action-desc" className="sr-only">
                Book a table for your dining experience
              </span>
            </a>
          </div>
          <ul className="hero-highlights" aria-label="Restaurant highlights and features">
            <li>
              <span className="sr-only">Features: </span>
              {t('hero.highlights.seasonal')}
            </li>
            <li>
              <span className="sr-only">Dietary options: </span>
              {t('hero.highlights.dietary')}
            </li>
            <li>
              <span className="sr-only">Beverages: </span>
              {t('hero.highlights.beverages')}
            </li>
          </ul>
        </div>
        <div 
          className="hero-card" 
          role="img" 
          aria-label={t('accessibility.restaurant_image')}
        />
      </div>
    </section>
  );
}

function Menu() {
  const { t } = useTranslation(['common', 'menu']);
  
  const menuData = {
    starters: [
      { key: 'heirloom_tomato_bruschetta', price: 10 },
      { key: 'crispy_calamari', price: 14 },
      { key: 'charred_broccolini', price: 11 },
    ],
    mains: [
      { key: 'herb_roasted_chicken', price: 22 },
      { key: 'seared_salmon', price: 26 },
      { key: 'wild_mushroom_risotto', price: 21, tag: 'vegetarian' },
    ],
    desserts: [
      { key: 'lemon_tart', price: 9 },
      { key: 'chocolate_fondant', price: 10 },
      { key: 'vanilla_panna_cotta', price: 9 },
    ],
    drinks: [
      { key: 'classic_negroni', price: 12 },
      { key: 'smoky_paloma', price: 13 },
      { key: 'zero_proof_spritz', price: 8, tag: 'non_alcoholic' },
    ],
  };

  return (
    <section id="menu" className="menu" aria-labelledby="menu-title">
      <div className="container">
        <h2 id="menu-title" className="section-title">{t('sections.menu.title')}</h2>
        <p className="section-subtitle">{t('sections.menu.subtitle')}</p>

        <div className="menu-grid" role="group" aria-label="Menu sections">
          <MenuSection title={t('menu:sections.starters')} items={menuData.starters} icon="🥗" section="starters" />
          <MenuSection title={t('menu:sections.mains')} items={menuData.mains} icon="🍽️" section="mains" highlight />
          <MenuSection title={t('menu:sections.desserts')} items={menuData.desserts} icon="🧁" section="desserts" />
          <MenuSection title={t('menu:sections.drinks')} items={menuData.drinks} icon="🍹" section="drinks" />
        </div>

        <div className="menu-note" role="complementary" aria-label="Dietary information">
          <p>
            {t('menu:note', {
              vegetarian: t('menu:tags.vegetarian'),
              gluten_free: t('menu:tags.gluten_free'),
              interpolation: { escapeValue: false }
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

function MenuSection({ title, items, icon, section, highlight = false }) {
  const { t } = useTranslation(['menu']);
  
  return (
    <div 
      className={`menu-section ${highlight ? 'highlight' : ''}`} 
      role="region" 
      aria-labelledby={`${title.toLowerCase()}-heading`}
      aria-describedby={highlight ? `${title.toLowerCase()}-featured` : undefined}
    >
      <div className="menu-section-header">
        <h3 id={`${title.toLowerCase()}-heading`} className="menu-section-title">
          <span className="menu-icon" aria-hidden="true">{icon}</span> 
          {title}
          {highlight && <span className="sr-only"> (Featured section)</span>}
        </h3>
        {highlight && (
          <span id={`${title.toLowerCase()}-featured`} className="sr-only">
            This is our featured menu section with popular items
          </span>
        )}
        <div className="menu-divider" aria-hidden="true" />
      </div>
      <ul className="menu-items" role="list" aria-label={`${title} menu items`}>
        {items.map((item, index) => (
          <li className="menu-item" key={item.key} role="listitem">
            <div className="menu-item-main">
              <span className="menu-item-name">
                {t(`menu:items.${section}.${item.key}.name`)} 
                {item.tag && (
                  <span 
                    className="tag" 
                    aria-label={t(`menu:tags.${item.tag}`)}
                  >
                    {t(`menu:tags.${item.tag}`)}
                  </span>
                )}
              </span>
              <span className="menu-item-price" aria-label={`Price: ${item.price} dollars`}>
                {t('menu:currency')}{item.price}
              </span>
            </div>
            <p className="menu-item-desc">{t(`menu:items.${section}.${item.key}.description`)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Details() {
  const { t } = useTranslation();
  
  return (
    <section id="details" className="details" aria-label="Hours and Contact details">
      <div className="container details-grid">
        <div id="hours" className="card" role="region" aria-labelledby="hours-title">
          <h2 id="hours-title" className="section-title small">{t('sections.hours.title')}</h2>
          <ul className="hours-list">
            <li><span>{t('hours.monday_thursday')}</span><span>11:30 AM – 9:00 PM</span></li>
            <li><span>{t('hours.friday')}</span><span>11:30 AM – 10:00 PM</span></li>
            <li><span>{t('hours.saturday')}</span><span>10:00 AM – 10:00 PM</span></li>
            <li><span>{t('hours.sunday')}</span><span>10:00 AM – 8:00 PM</span></li>
            <li className="note">{t('hours.brunch_note')}</li>
          </ul>
        </div>

        <div id="contact" className="card" role="region" aria-labelledby="contact-title">
          <h2 id="contact-title" className="section-title small">{t('sections.contact.title')}</h2>
          <ContactForm />
          <div className="contact-details" aria-label="Contact details">
            <p><strong>{t('contact.details.phone')}</strong> <a href="tel:+1234567890" className="link">{t('contact.info.phone')}</a></p>
            <p><strong>{t('contact.details.email')}</strong> <a href="mailto:hello@casamoderna.com" className="link">{t('contact.info.email')}</a></p>
            <p><strong>{t('contact.details.address')}</strong> {t('contact.info.address')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const { t } = useTranslation();
  
  // PUBLIC_INTERFACE
  // Simple accessible form (no backend). Uses HTML validation.
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name');
    alert(t('contact.form.thank_you', { name }));
    form.reset();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact form">
      <div className="form-row">
        <label htmlFor="name">{t('contact.form.name')}</label>
        <input id="name" name="name" type="text" placeholder={t('contact.form.name_placeholder')} required />
      </div>
      <div className="form-row">
        <label htmlFor="email">{t('contact.form.email')}</label>
        <input id="email" name="email" type="email" placeholder={t('contact.form.email_placeholder')} required />
      </div>
      <div className="form-row">
        <label htmlFor="message">{t('contact.form.message')}</label>
        <textarea id="message" name="message" rows="4" placeholder={t('contact.form.message_placeholder')} required />
      </div>
      <button type="submit" className="btn btn-primary" aria-label="Send message">{t('contact.form.send')}</button>
    </form>
  );
}

function Gallery() {
  const { t } = useTranslation();
  
  // Placeholder images from unsplash.it to avoid binary assets
  const images = [
    'https://images.unsplash.com/photo-1543351611-56b38f3b9b88?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541580621-cb61c9bbfa93?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop',
  ];
  return (
    <section id="gallery" className="gallery" aria-label="Restaurant gallery">
      <div className="container">
        <h2 className="section-title">{t('sections.gallery.title')}</h2>
        <p className="section-subtitle">{t('sections.gallery.subtitle')}</p>
        <div className="gallery-grid">
          {images.map((src, i) => (
            <figure className="gallery-item" key={src}>
              <img src={src} alt={t('accessibility.gallery_image', { number: i + 1 })} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  const { t } = useTranslation();
  
  return (
    <section id="location" className="location" aria-label="Map and location">
      <div className="container location-grid">
        <div className="location-info card">
          <h2 className="section-title small">{t('sections.location.title')}</h2>
          <p>{t('sections.location.subtitle')}</p>
          <ul className="location-list">
            <li><strong>{t('location.address')}</strong> {t('contact.info.address')}</li>
            <li><strong>{t('location.parking')}</strong> {t('location.parking_info')}</li>
            <li><strong>{t('location.transit')}</strong> {t('location.transit_info')}</li>
          </ul>
        </div>
        <div className="map-wrapper" role="region" aria-label="Map">
          <iframe
            title="Restaurant location on map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=San%20Francisco%20Market%20Street&output=embed"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <p className="footer-brand">
          <span className="logo" aria-hidden="true">🍽️</span> {t('brand.name')}
        </p>
        <p className="footer-copy">{t('footer.copyright', { year })}</p>
        <ul className="footer-links" aria-label="Footer links">
          <li><a href="#events">{t('navigation.events')}</a></li>
          <li><a href="#loyalty">{t('navigation.rewards')}</a></li>
          <li><a href="#menu">{t('navigation.menu')}</a></li>
          <li><a href="#chefs-special">{t('navigation.chefs_special')}</a></li>
          <li><a href="#reviews">{t('navigation.reviews')}</a></li>
          <li><a href="#reservation">{t('navigation.reservations')}</a></li>
          <li><a href="#hours">{t('navigation.hours')}</a></li>
          <li><a href="#contact">{t('navigation.contact')}</a></li>
          <li><a href="#gallery">{t('navigation.gallery')}</a></li>
          <li><a href="#location">{t('navigation.location')}</a></li>
          <li><a href="#newsletter">{t('navigation.newsletter')}</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default App;
