import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * PUBLIC_INTERFACE
 * Chef's Special/Featured Dish component highlighting signature dishes.
 * Features rotating specials, appetizing imagery, detailed descriptions,
 * pricing, accessibility support, and full theme integration (light/dark modes).
 */
function ChefsSpecial() {
  const { t } = useTranslation(['common', 'chefs-special']);
  
  // Featured dishes data - in a real app this would come from a CMS or API
  const featuredDishes = [
    {
      id: 1,
      name: 'Pan-Seared Duck Breast',
      subtitle: 'Chef\'s Signature Creation',
      description: 'Succulent duck breast pan-seared to perfection, served with a cherry port reduction, roasted fingerling potatoes, and seasonal vegetables. Our chef\'s interpretation of a classic French dish with modern flair.',
      longDescription: 'Our signature duck breast is sourced from local farms and aged for optimal flavor. The duck is expertly scored and seared to achieve a perfect crispy skin while maintaining a tender, rosy interior. The cherry port reduction is made in-house using fresh cherries and aged port wine, creating a beautiful balance of sweet and savory notes.',
      price: 34,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop',
      dietary: ['GF Available'],
      preparationTime: '25-30 minutes',
      spiceLevel: 'Mild',
      featured: true,
      chefNote: 'Paired beautifully with our house Pinot Noir selection.',
      ingredients: ['Free-range duck breast', 'Cherry port reduction', 'Fingerling potatoes', 'Seasonal vegetables', 'Fresh herbs']
    },
    {
      id: 2,
      name: 'Lobster Risotto',
      subtitle: 'Today\'s Special',
      description: 'Creamy Arborio rice cooked with fresh Maine lobster, saffron, and finished with parmesan and microgreens. A luxurious dish that showcases the sweet delicate flavor of fresh lobster.',
      longDescription: 'Made with the finest Arborio rice from Italy, slowly cooked with white wine and lobster stock. Fresh Maine lobster meat is gently folded in at the end to preserve its delicate texture. The saffron adds a subtle floral note and beautiful golden color.',
      price: 42,
      originalPrice: 48,
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?q=80&w=1200&auto=format&fit=crop',
      dietary: ['GF'],
      preparationTime: '20-25 minutes',
      spiceLevel: 'None',
      featured: false,
      chefNote: 'Best enjoyed with a crisp Chardonnay or Champagne.',
      ingredients: ['Maine lobster', 'Arborio rice', 'Saffron', 'Parmesan', 'White wine', 'Microgreens']
    },
    {
      id: 3,
      name: 'Wagyu Beef Tenderloin',
      subtitle: 'Premium Selection',
      description: 'Grade A5 Wagyu beef tenderloin, grilled to your preference and served with truffle mashed potatoes, grilled asparagus, and red wine jus. An exceptional dining experience for meat lovers.',
      longDescription: 'This premium Wagyu beef is renowned for its incredible marbling and buttery texture. Each cut is hand-selected and aged for 28 days. The truffle mashed potatoes are made with Yukon Gold potatoes and finished with real black truffle shavings.',
      price: 65,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop',
      dietary: ['GF Available'],
      preparationTime: '15-20 minutes',
      spiceLevel: 'None',
      featured: false,
      chefNote: 'Recommended with our selection of aged Cabernet Sauvignon.',
      ingredients: ['A5 Wagyu beef', 'Black truffle', 'Yukon potatoes', 'Asparagus', 'Red wine jus']
    }
  ];

  const [currentDishIndex, setCurrentDishIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const currentDish = featuredDishes[currentDishIndex];

  const nextDish = useCallback(() => {
    setCurrentDishIndex(prev => (prev + 1) % featuredDishes.length);
    setShowFullDescription(false);
  }, [featuredDishes.length]);

  const prevDish = useCallback(() => {
    setCurrentDishIndex(prev => (prev - 1 + featuredDishes.length) % featuredDishes.length);
    setShowFullDescription(false);
  }, [featuredDishes.length]);

  const goToDish = useCallback((index) => {
    setCurrentDishIndex(index);
    setShowFullDescription(false);
  }, []);

  const toggleDescription = useCallback(() => {
    setShowFullDescription(prev => !prev);
  }, []);

  const discountPercentage = currentDish.originalPrice 
    ? Math.round((1 - currentDish.price / currentDish.originalPrice) * 100)
    : 0;

  return (
    <section id="chefs-special" className="chefs-special" aria-label="Chef's featured dishes">
      <div className="container">
        {/* Section Header */}
        <div className="special-header">
          <h2 className="section-title">
            <span className="chef-icon" aria-hidden="true">👨‍🍳</span>
            Chef's Special
          </h2>
          <p className="section-subtitle">
            Experience our signature creations, carefully crafted with the finest ingredients and innovative techniques.
          </p>
        </div>

        {/* Featured Dish Showcase */}
        <div className="featured-dish-showcase">
          <div className="dish-container">
            <div className="dish-navigation" aria-label="Dish navigation">
              <button
                className="nav-btn nav-prev"
                onClick={prevDish}
                aria-label="Previous dish"
                disabled={featuredDishes.length <= 1}
              >
                <span aria-hidden="true">‹</span>
              </button>
              
              <div className="dish-indicators" role="tablist" aria-label="Featured dishes">
                {featuredDishes.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentDishIndex ? 'active' : ''}`}
                    onClick={() => goToDish(index)}
                    role="tab"
                    aria-selected={index === currentDishIndex}
                    aria-label={`View dish ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className="nav-btn nav-next"
                onClick={nextDish}
                aria-label="Next dish"
                disabled={featuredDishes.length <= 1}
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>

            <article className="featured-dish-card" role="article">
              <div className="dish-image-section">
                <div className="dish-image-wrapper">
                  <img
                    src={currentDish.image}
                    alt={`${currentDish.name} - Chef's special dish`}
                    className="dish-image"
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    {currentDish.featured && (
                      <span className="featured-badge" aria-label="Featured dish">
                        <span aria-hidden="true">⭐</span>
                        Chef's Favorite
                      </span>
                    )}
                    {discountPercentage > 0 && (
                      <span className="discount-badge" aria-label={`${discountPercentage}% off`}>
                        {discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="dish-content-section">
                <div className="dish-header">
                  <div className="dish-title-group">
                    <h3 className="dish-name">{currentDish.name}</h3>
                    <p className="dish-subtitle">{currentDish.subtitle}</p>
                  </div>
                  
                  <div className="dish-pricing">
                    <span className="current-price" aria-label={`Current price: $${currentDish.price}`}>
                      ${currentDish.price}
                    </span>
                    {currentDish.originalPrice && (
                      <span className="original-price" aria-label={`Original price: $${currentDish.originalPrice}`}>
                        ${currentDish.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="dish-description">
                  <p className="description-text">
                    {showFullDescription ? currentDish.longDescription : currentDish.description}
                  </p>
                  
                  <button
                    className="description-toggle"
                    onClick={toggleDescription}
                    aria-expanded={showFullDescription}
                    aria-label={showFullDescription ? 'Show less description' : 'Show full description'}
                  >
                    {showFullDescription ? 'Show Less' : 'Learn More'}
                    <span className="toggle-icon" aria-hidden="true">
                      {showFullDescription ? '↑' : '↓'}
                    </span>
                  </button>
                </div>

                <div className="dish-details">
                  <div className="detail-row">
                    <span className="detail-label">
                      <span aria-hidden="true">🍽️</span>
                      Ingredients:
                    </span>
                    <span className="detail-value">
                      {currentDish.ingredients.join(', ')}
                    </span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">
                      <span aria-hidden="true">⏱️</span>
                      Preparation:
                    </span>
                    <span className="detail-value">{currentDish.preparationTime}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">
                      <span aria-hidden="true">🌶️</span>
                      Spice Level:
                    </span>
                    <span className="detail-value">{currentDish.spiceLevel}</span>
                  </div>
                  
                  {currentDish.dietary.length > 0 && (
                    <div className="detail-row">
                      <span className="detail-label">
                        <span aria-hidden="true">🌱</span>
                        Dietary:
                      </span>
                      <span className="detail-value">
                        {currentDish.dietary.map((tag, index) => (
                          <span key={tag} className="dietary-tag">
                            {tag}
                            {index < currentDish.dietary.length - 1 && ', '}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                </div>

                {currentDish.chefNote && (
                  <div className="chef-note">
                    <span className="chef-note-icon" aria-hidden="true">💡</span>
                    <p className="chef-note-text">
                      <strong>Chef's Note:</strong> {currentDish.chefNote}
                    </p>
                  </div>
                )}

                <div className="dish-actions">
                  <a 
                    href="#reservation" 
                    className="btn btn-primary dish-order-btn"
                    aria-label={`Reserve table to try ${currentDish.name}`}
                  >
                    <span aria-hidden="true">🍽️</span>
                    Reserve to Try This
                  </a>
                  <a 
                    href="#menu" 
                    className="btn btn-accent dish-menu-btn"
                    aria-label="View full menu"
                  >
                    <span aria-hidden="true">📋</span>
                    View Full Menu
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* All Specials Preview */}
        <div className="all-specials-section">
          <h3 className="all-specials-title">All Chef's Specials</h3>
          <div className="specials-grid">
            {featuredDishes.map((dish, index) => (
              <div 
                key={dish.id} 
                className={`special-preview-card ${index === currentDishIndex ? 'active' : ''}`}
                role="button"
                tabIndex="0"
                onClick={() => goToDish(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToDish(index);
                  }
                }}
                aria-label={`View ${dish.name} details`}
              >
                <div className="preview-image-wrapper">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="preview-image"
                    loading="lazy"
                  />
                  {dish.featured && (
                    <span className="preview-featured-badge" aria-hidden="true">⭐</span>
                  )}
                </div>
                <div className="preview-content">
                  <h4 className="preview-name">{dish.name}</h4>
                  <p className="preview-price">
                    ${dish.price}
                    {dish.originalPrice && (
                      <span className="preview-original-price">${dish.originalPrice}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChefsSpecial;
