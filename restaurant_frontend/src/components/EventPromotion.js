import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * PUBLIC_INTERFACE
 * Event Promotion component for highlighting special events, seasonal offers,
 * and current promotions. Features rotating event displays, accessibility support,
 * and theme integration (light/dark modes).
 */
function EventPromotion() {
  const { t } = useTranslation(['common', 'events']);
  
  // Sample event data - in a real app this would come from a CMS or API
  const eventsData = [
    {
      id: 1,
      type: 'live-music',
      titleKey: 'live_jazz.title',
      subtitleKey: 'live_jazz.subtitle',
      descriptionKey: 'live_jazz.description',
      detailsKeys: ['live_jazz.details.0', 'live_jazz.details.1', 'live_jazz.details.2'],
      ctaKey: 'live_jazz.cta',
      ctaLink: '#reservation',
      backgroundColor: 'var(--color-accent)',
      textColor: '#ffffff',
      icon: '🎷',
      badgeKey: 'live_jazz.badge',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',
      featured: true
    },
    {
      id: 2,
      type: 'seasonal',
      titleKey: 'wine_dinner.title',
      subtitleKey: 'wine_dinner.subtitle',
      descriptionKey: 'wine_dinner.description',
      detailsKeys: ['wine_dinner.details.0', 'wine_dinner.details.1', 'wine_dinner.details.2'],
      ctaKey: 'wine_dinner.cta',
      ctaLink: '#contact',
      backgroundColor: 'var(--color-primary)',
      textColor: '#ffffff',
      icon: '🍷',
      badgeKey: 'wine_dinner.badge',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
      featured: false
    },
    {
      id: 3,
      type: 'promotion',
      titleKey: 'happy_hour.title',
      subtitleKey: 'happy_hour.subtitle',
      descriptionKey: 'happy_hour.description',
      detailsKeys: ['happy_hour.details.0', 'happy_hour.details.1', 'happy_hour.details.2'],
      ctaKey: 'happy_hour.cta',
      ctaLink: '#menu',
      backgroundColor: 'var(--color-secondary)',
      textColor: '#2d2d2d',
      icon: '🍹',
      badgeKey: 'happy_hour.badge',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop',
      featured: false
    },
    {
      id: 4,
      type: 'holiday',
      titleKey: 'valentines.title',
      subtitleKey: 'valentines.subtitle',
      descriptionKey: 'valentines.description',
      detailsKeys: ['valentines.details.0', 'valentines.details.1', 'valentines.details.2'],
      ctaKey: 'valentines.cta',
      ctaLink: '#reservation',
      backgroundColor: '#e91e63',
      textColor: '#ffffff',
      icon: '💕',
      badgeKey: 'valentines.badge',
      image: 'https://images.unsplash.com/photo-1518621012488-2a6c28ba5ac5?q=80&w=1200&auto=format&fit=crop',
      featured: true
    }
  ];

  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const featuredEvents = eventsData.filter(event => event.featured);
  const currentEvent = featuredEvents[currentEventIndex];

  const nextEvent = useCallback(() => {
    setCurrentEventIndex(prev => (prev + 1) % featuredEvents.length);
  }, [featuredEvents.length]);

  const prevEvent = useCallback(() => {
    setCurrentEventIndex(prev => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  }, [featuredEvents.length]);

  const goToEvent = useCallback((index) => {
    setCurrentEventIndex(index);
  }, []);

  return (
    <section id="events" className="event-promotion" aria-label="Special events and promotions">
      <div className="container">
        {/* Featured Event Banner */}
        <div className="featured-event" role="region" aria-labelledby="featured-event-title">
          <div 
            className="featured-event-card"
            style={{
              backgroundColor: currentEvent.backgroundColor,
              color: currentEvent.textColor
            }}
          >
            <div className="featured-event-content">
              <div className="event-header">
                <span className="event-badge" aria-label={`Event type: ${t(`events:events.${currentEvent.badgeKey}`)}`}>
                  <span className="event-icon" aria-hidden="true">{currentEvent.icon}</span>
                  {t(`events:events.${currentEvent.badgeKey}`)}
                </span>
                <div className="event-navigation" aria-label="Event navigation">
                  <button
                    className="nav-btn nav-prev"
                    onClick={prevEvent}
                    aria-label="Previous event"
                    disabled={featuredEvents.length <= 1}
                  >
                    ←
                  </button>
                  <div className="event-indicators" role="tablist" aria-label="Featured events">
                    {featuredEvents.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${index === currentEventIndex ? 'active' : ''}`}
                        onClick={() => goToEvent(index)}
                        role="tab"
                        aria-selected={index === currentEventIndex}
                        aria-label={`Go to event ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    className="nav-btn nav-next"
                    onClick={nextEvent}
                    aria-label="Next event"
                    disabled={featuredEvents.length <= 1}
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="event-main">
                <div className="event-text">
                  <h2 id="featured-event-title" className="event-title">
                    {t(`events:events.${currentEvent.titleKey}`)}
                  </h2>
                  <p className="event-subtitle">{t(`events:events.${currentEvent.subtitleKey}`)}</p>
                  <p className="event-description">{t(`events:events.${currentEvent.descriptionKey}`)}</p>
                  
                  <ul className="event-details" aria-label="Event details">
                    {currentEvent.detailsKeys.map((detailKey, index) => (
                      <li key={index}>{t(`events:events.${detailKey}`)}</li>
                    ))}
                  </ul>
                  
                  <a 
                    href={currentEvent.ctaLink} 
                    className="event-cta-btn"
                    aria-label={`${t(`events:events.${currentEvent.ctaKey}`)} for ${t(`events:events.${currentEvent.titleKey}`)}`}
                  >
                    {t(`events:events.${currentEvent.ctaKey}`)}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
                
                <div className="event-image-wrapper">
                  <img
                    src={currentEvent.image}
                    alt={`${t(`events:events.${currentEvent.titleKey}`)} promotional image`}
                    className="event-image"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Events Grid */}
        <div className="events-section">
          <div className="events-header">
            <h3 className="section-title small">{t('events:featured_title')}</h3>
            <p className="section-subtitle">{t('events:subtitle')}</p>
          </div>
          
          <div className="events-grid">
            {eventsData.map((event) => (
              <article key={event.id} className="event-card" role="article">
                <div className="event-card-header">
                  <span className="event-card-badge">
                    <span aria-hidden="true">{event.icon}</span>
                    {t(`events:events.${event.badgeKey}`)}
                  </span>
                  {event.featured && (
                    <span className="featured-indicator" aria-label="Featured event">
                      ⭐
                    </span>
                  )}
                </div>
                
                <div className="event-card-content">
                  <h4 className="event-card-title">{t(`events:events.${event.titleKey}`)}</h4>
                  <p className="event-card-subtitle">{t(`events:events.${event.subtitleKey}`)}</p>
                  <p className="event-card-description">{t(`events:events.${event.descriptionKey}`)}</p>
                  
                  <ul className="event-card-details">
                    {event.detailsKeys.slice(0, 2).map((detailKey, index) => (
                      <li key={index}>{t(`events:events.${detailKey}`)}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="event-card-footer">
                  <a 
                    href={event.ctaLink} 
                    className="event-card-btn"
                    aria-label={`${t(`events:events.${event.ctaKey}`)} for ${t(`events:events.${event.titleKey}`)}`}
                  >
                    {t(`events:events.${event.ctaKey}`)}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventPromotion;
