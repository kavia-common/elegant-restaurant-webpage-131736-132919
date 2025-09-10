import React, { useState, useCallback } from 'react';

/**
 * PUBLIC_INTERFACE
 * Event Promotion component for highlighting special events, seasonal offers,
 * and current promotions. Features rotating event displays, accessibility support,
 * and theme integration (light/dark modes).
 */
function EventPromotion() {
  // Sample event data - in a real app this would come from a CMS or API
  const eventsData = [
    {
      id: 1,
      type: 'live-music',
      title: 'Live Jazz Nights',
      subtitle: 'Every Friday & Saturday',
      description: 'Join us for an intimate evening of live jazz featuring local artists. Perfect atmosphere for date nights and celebrations.',
      details: ['7:00 PM - 10:00 PM', 'No cover charge', 'Cocktail specials available'],
      ctaText: 'Reserve Your Table',
      ctaLink: '#reservation',
      backgroundColor: 'var(--color-accent)',
      textColor: '#ffffff',
      icon: '🎷',
      badge: 'Weekly',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',
      featured: true
    },
    {
      id: 2,
      type: 'seasonal',
      title: 'Winter Wine Dinner Series',
      subtitle: 'Limited Time Only',
      description: 'Experience our carefully curated 5-course winter menu paired with premium wines from renowned vineyards.',
      details: ['Available through March', '$85 per person', 'Vegetarian options available'],
      ctaText: 'Book Wine Dinner',
      ctaLink: '#contact',
      backgroundColor: 'var(--color-primary)',
      textColor: '#ffffff',
      icon: '🍷',
      badge: 'Seasonal',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
      featured: false
    },
    {
      id: 3,
      type: 'promotion',
      title: 'Happy Hour Special',
      subtitle: 'Monday - Thursday',
      description: 'Enjoy 30% off all craft cocktails and appetizers during our extended happy hour.',
      details: ['4:00 PM - 6:30 PM', '30% off drinks & appetizers', 'Bar seating available'],
      ctaText: 'View Menu',
      ctaLink: '#menu',
      backgroundColor: 'var(--color-secondary)',
      textColor: '#2d2d2d',
      icon: '🍹',
      badge: 'Daily Deal',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop',
      featured: false
    },
    {
      id: 4,
      type: 'holiday',
      title: 'Valentine\'s Day Special',
      subtitle: 'February 14th',
      description: 'Celebrate love with our romantic dinner experience featuring a special tasting menu and complimentary champagne.',
      details: ['Two seatings: 6:00 PM & 8:30 PM', 'Special tasting menu', 'Complimentary champagne toast'],
      ctaText: 'Make Reservation',
      ctaLink: '#reservation',
      backgroundColor: '#e91e63',
      textColor: '#ffffff',
      icon: '💕',
      badge: 'Special Event',
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
                <span className="event-badge" aria-label={`Event type: ${currentEvent.badge}`}>
                  <span className="event-icon" aria-hidden="true">{currentEvent.icon}</span>
                  {currentEvent.badge}
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
                    {currentEvent.title}
                  </h2>
                  <p className="event-subtitle">{currentEvent.subtitle}</p>
                  <p className="event-description">{currentEvent.description}</p>
                  
                  <ul className="event-details" aria-label="Event details">
                    {currentEvent.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                  
                  <a 
                    href={currentEvent.ctaLink} 
                    className="event-cta-btn"
                    aria-label={`${currentEvent.ctaText} for ${currentEvent.title}`}
                  >
                    {currentEvent.ctaText}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
                
                <div className="event-image-wrapper">
                  <img
                    src={currentEvent.image}
                    alt={`${currentEvent.title} promotional image`}
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
            <h3 className="section-title small">Current Events & Offers</h3>
            <p className="section-subtitle">Don't miss out on our special experiences and limited-time offers.</p>
          </div>
          
          <div className="events-grid">
            {eventsData.map((event) => (
              <article key={event.id} className="event-card" role="article">
                <div className="event-card-header">
                  <span className="event-card-badge">
                    <span aria-hidden="true">{event.icon}</span>
                    {event.badge}
                  </span>
                  {event.featured && (
                    <span className="featured-indicator" aria-label="Featured event">
                      ⭐
                    </span>
                  )}
                </div>
                
                <div className="event-card-content">
                  <h4 className="event-card-title">{event.title}</h4>
                  <p className="event-card-subtitle">{event.subtitle}</p>
                  <p className="event-card-description">{event.description}</p>
                  
                  <ul className="event-card-details">
                    {event.details.slice(0, 2).map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="event-card-footer">
                  <a 
                    href={event.ctaLink} 
                    className="event-card-btn"
                    aria-label={`${event.ctaText} for ${event.title}`}
                  >
                    {event.ctaText}
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
