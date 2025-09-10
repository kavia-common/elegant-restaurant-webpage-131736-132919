import React, { useEffect, useMemo, useState, useCallback, createContext, useContext } from 'react';
import './App.css';
import Reservation from './components/Reservation';

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
          <Menu />
          <Reservation />
          <Details />
          <Gallery />
          <Location />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

function SkipToContent() {
  return (
    <a className="skip-link" href="#main-content">
      Skip to main content
    </a>
  );
}

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const icon = theme === 'light' ? '🌙' : '☀️';
  return (
    <header className="navbar" role="banner">
      <div className="container nav-inner">
        <div className="brand">
          <span className="logo" aria-hidden="true">🍽️</span>
          <a href="#hero" className="brand-name" aria-label="Go to top">
            Casa Moderna
          </a>
        </div>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#menu">Menu</a>
          <a href="#reservation">Reservations</a>
          <a href="#hours">Hours</a>
          <a href="#contact">Contact</a>
          <a href="#gallery">Gallery</a>
          <a href="#location">Location</a>
        </nav>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${nextTheme} theme`}
          title={`Switch to ${nextTheme} theme`}
        >
          <span aria-hidden="true">{icon}</span>
          <span style={{ fontWeight: 700, fontSize: 12, letterSpacing: 0.3 }}>
            {theme === 'light' ? 'Light' : 'Dark'}
          </span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero" aria-label="Restaurant introduction">
      <div className="container hero-inner">
        <div className="hero-content">
          <h1 className="hero-title">Modern Flavors. Warm Hospitality.</h1>
          <p className="hero-subtitle">
            A stylish dining experience featuring seasonal ingredients,
            wood‑fired specials, and craft cocktails.
          </p>
          <div className="hero-actions">
            <a href="#menu" className="btn btn-primary">Explore Menu</a>
            <a href="#reservation" className="btn btn-accent" aria-label="Reserve a table">
              Reserve a Table
            </a>
          </div>
          <ul className="hero-highlights" aria-label="Highlights">
            <li>Seasonal • Local • Sustainable</li>
            <li>Vegetarian & Gluten‑Free Options</li>
            <li>Craft Cocktails & Fine Wines</li>
          </ul>
        </div>
        <div className="hero-card" role="img" aria-label="Featured dishes imagery" />
      </div>
    </section>
  );
}

function Menu() {
  const starters = [
    { name: 'Heirloom Tomato Bruschetta', desc: 'Grilled sourdough, basil, balsamic glaze', price: 10 },
    { name: 'Crispy Calamari', desc: 'Lemon aioli, pickled chili', price: 14 },
    { name: 'Charred Broccolini', desc: 'Almond romesco, lemon zest', price: 11 },
  ];
  const mains = [
    { name: 'Herb-Roasted Chicken', desc: 'Garlic mash, seasonal greens, jus', price: 22 },
    { name: 'Seared Salmon', desc: 'Citrus beurre blanc, farro, asparagus', price: 26 },
    { name: 'Wild Mushroom Risotto', desc: 'Parmesan, truffle oil, herbs', price: 21, tag: 'V' },
  ];
  const desserts = [
    { name: 'Lemon Tart', desc: 'Toasted meringue, berry coulis', price: 9 },
    { name: 'Chocolate Fondant', desc: 'Vanilla gelato, hazelnut praline', price: 10 },
    { name: 'Vanilla Panna Cotta', desc: 'Macerated berries, mint', price: 9 },
  ];
  const drinks = [
    { name: 'Classic Negroni', desc: 'Gin, Campari, sweet vermouth', price: 12 },
    { name: 'Smoky Paloma', desc: 'Mezcal, grapefruit, lime, soda', price: 13 },
    { name: 'Zero-Proof Spritz', desc: 'Citrus, hibiscus, soda', price: 8, tag: 'NA' },
  ];

  return (
    <section id="menu" className="menu" aria-label="Menu">
      <div className="container">
        <h2 className="section-title">Our Menu</h2>
        <p className="section-subtitle">Thoughtfully curated dishes, prepared fresh daily.</p>

        <div className="menu-grid">
          <MenuSection title="Starters" items={starters} icon="🥗" />
          <MenuSection title="Mains" items={mains} icon="🍽️" highlight />
          <MenuSection title="Desserts" items={desserts} icon="🧁" />
          <MenuSection title="Drinks" items={drinks} icon="🍹" />
        </div>

        <div className="menu-note" role="note">
          <span className="tag">V</span> Vegetarian • <span className="tag">GF</span> Gluten‑Free options available •
          Please notify us of any allergies or dietary restrictions.
        </div>
      </div>
    </section>
  );
}

function MenuSection({ title, items, icon, highlight = false }) {
  return (
    <div className={`menu-section ${highlight ? 'highlight' : ''}`} role="region" aria-labelledby={`${title}-heading`}>
      <div className="menu-section-header">
        <h3 id={`${title}-heading`} className="menu-section-title">
          <span className="menu-icon" aria-hidden="true">{icon}</span> {title}
        </h3>
        <div className="menu-divider" aria-hidden="true" />
      </div>
      <ul className="menu-items">
        {items.map((item) => (
          <li className="menu-item" key={item.name}>
            <div className="menu-item-main">
              <span className="menu-item-name">
                {item.name} {item.tag && <span className="tag">{item.tag}</span>}
              </span>
              <span className="menu-item-price">${item.price}</span>
            </div>
            <p className="menu-item-desc">{item.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Details() {
  return (
    <section id="details" className="details" aria-label="Hours and Contact details">
      <div className="container details-grid">
        <div id="hours" className="card" role="region" aria-labelledby="hours-title">
          <h2 id="hours-title" className="section-title small">Opening Hours</h2>
          <ul className="hours-list">
            <li><span>Mon–Thu</span><span>11:30 AM – 9:00 PM</span></li>
            <li><span>Fri</span><span>11:30 AM – 10:00 PM</span></li>
            <li><span>Sat</span><span>10:00 AM – 10:00 PM</span></li>
            <li><span>Sun</span><span>10:00 AM – 8:00 PM</span></li>
            <li className="note">Brunch Sat & Sun 10:00 AM – 2:00 PM</li>
          </ul>
        </div>

        <div id="contact" className="card" role="region" aria-labelledby="contact-title">
          <h2 id="contact-title" className="section-title small">Contact Us</h2>
          <ContactForm />
          <div className="contact-details" aria-label="Contact details">
            <p><strong>Phone:</strong> <a href="tel:+1234567890" className="link">+1 (234) 567‑890</a></p>
            <p><strong>Email:</strong> <a href="mailto:hello@casamoderna.com" className="link">hello@casamoderna.com</a></p>
            <p><strong>Address:</strong> 123 Market Street, San Francisco, CA</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  // PUBLIC_INTERFACE
  // Simple accessible form (no backend). Uses HTML validation.
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name');
    alert(`Thank you, ${name}! We will get back to you shortly.`);
    form.reset();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact form">
      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Your full name" required />
      </div>
      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" required />
      </div>
      <div className="form-row">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="4" placeholder="How can we help?" required />
      </div>
      <button type="submit" className="btn btn-primary" aria-label="Send message">Send</button>
    </form>
  );
}

function Gallery() {
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
        <h2 className="section-title">Gallery</h2>
        <p className="section-subtitle">A glimpse into our space, cuisine, and ambiance.</p>
        <div className="gallery-grid">
          {images.map((src, i) => (
            <figure className="gallery-item" key={src}>
              <img src={src} alt={`Restaurant view ${i + 1}`} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="location" aria-label="Map and location">
      <div className="container location-grid">
        <div className="location-info card">
          <h2 className="section-title small">Find Us</h2>
          <p>We are located in the heart of the city, steps away from the central plaza.</p>
          <ul className="location-list">
            <li><strong>Address:</strong> 123 Market Street, San Francisco, CA</li>
            <li><strong>Parking:</strong> Street and garage parking available</li>
            <li><strong>Transit:</strong> MUNI & BART within a 5-minute walk</li>
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
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <p className="footer-brand">
          <span className="logo" aria-hidden="true">🍽️</span> Casa Moderna
        </p>
        <p className="footer-copy">© {year} Casa Moderna. All rights reserved.</p>
        <ul className="footer-links" aria-label="Footer links">
          <li><a href="#menu">Menu</a></li>
          <li><a href="#reservation">Reservations</a></li>
          <li><a href="#hours">Hours</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#location">Location</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default App;
