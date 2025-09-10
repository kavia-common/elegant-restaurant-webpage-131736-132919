import React, { useState, useCallback } from 'react';

/**
 * PUBLIC_INTERFACE
 * Customer Reviews/Testimonials component for the restaurant.
 * Features customer feedback with star ratings, optional photos,
 * theme support (light/dark), accessibility features, and responsive design.
 */
function Reviews() {
  // Sample review data - in a real app this would come from an API
  const reviewsData = [
    {
      id: 1,
      name: 'Sarah Martinez',
      rating: 5,
      date: '2024-01-15',
      review: 'Absolutely phenomenal dining experience! The herb-roasted chicken was perfectly seasoned and the service was impeccable. The ambiance is elegant yet cozy. Will definitely be returning!',
      photo: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=400&auto=format&fit=crop',
      verified: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 5,
      date: '2024-01-12',
      review: 'Casa Moderna exceeded all expectations. The seared salmon was divine and the craft cocktails were creative and delicious. Perfect for a special occasion!',
      photo: null,
      verified: true
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      rating: 4,
      date: '2024-01-10',
      review: 'Beautiful restaurant with amazing food. The wild mushroom risotto was incredible - so rich and flavorful. The only minor issue was the wait time, but it was worth it.',
      photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&auto=format&fit=crop',
      verified: true
    },
    {
      id: 4,
      name: 'David Thompson',
      rating: 5,
      date: '2024-01-08',
      review: 'Outstanding experience from start to finish. The staff was knowledgeable about wine pairings, and every dish was expertly prepared. The chocolate fondant was the perfect ending!',
      photo: null,
      verified: true
    },
    {
      id: 5,
      name: 'Lisa Wang',
      rating: 5,
      date: '2024-01-05',
      review: 'Took my parents here for their anniversary and they loved it! The atmosphere is warm and inviting, and the vegetarian options were fantastic. Highly recommend!',
      photo: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=400&auto=format&fit=crop',
      verified: true
    },
    {
      id: 6,
      name: 'James Park',
      rating: 4,
      date: '2024-01-03',
      review: 'Great food and excellent service. The crispy calamari starter was particularly good. The restaurant has a sophisticated vibe perfect for date nights.',
      photo: null,
      verified: true
    }
  ];

  const [visibleReviews, setVisibleReviews] = useState(3);
  const [expandedReviews, setExpandedReviews] = useState(new Set());

  const showMoreReviews = useCallback(() => {
    setVisibleReviews(prev => Math.min(prev + 3, reviewsData.length));
  }, [reviewsData.length]);

  const toggleReviewExpansion = useCallback((reviewId) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  }, []);

  // Calculate average rating
  const averageRating = reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length;
  const totalReviews = reviewsData.length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <section id="reviews" className="reviews" aria-label="Customer reviews and testimonials">
      <div className="container">
        <div className="reviews-header">
          <h2 className="section-title">What Our Guests Say</h2>
          <p className="section-subtitle">
            Hear from our valued customers about their dining experiences at Casa Moderna.
          </p>
          
          {/* Overall Rating Summary */}
          <div className="rating-summary" role="region" aria-labelledby="rating-summary-title">
            <h3 id="rating-summary-title" className="sr-only">Overall rating summary</h3>
            <div className="rating-overview">
              <div className="rating-display">
                <span className="average-rating" aria-label={`Average rating: ${averageRating.toFixed(1)} out of 5 stars`}>
                  {averageRating.toFixed(1)}
                </span>
                <div className="stars-display" aria-hidden="true">
                  <StarRating rating={averageRating} />
                </div>
              </div>
              <div className="rating-details">
                <span className="review-count">Based on {totalReviews} reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviewsData.slice(0, visibleReviews).map((review) => {
            const isExpanded = expandedReviews.has(review.id);
            const shouldTruncate = review.review.length > 150;
            const displayText = isExpanded || !shouldTruncate 
              ? review.review 
              : truncateText(review.review);

            return (
              <article key={review.id} className="review-card" role="article">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-details">
                      <h4 className="reviewer-name">{review.name}</h4>
                      {review.verified && (
                        <span className="verified-badge" aria-label="Verified customer">
                          <span aria-hidden="true">✓</span> Verified
                        </span>
                      )}
                    </div>
                    <time className="review-date" dateTime={review.date}>
                      {formatDate(review.date)}
                    </time>
                  </div>
                  
                  <div className="review-rating" aria-label={`${review.rating} out of 5 stars`}>
                    <StarRating rating={review.rating} />
                  </div>
                </div>

                <div className="review-content">
                  <blockquote className="review-text">
                    "{displayText}"
                    {shouldTruncate && (
                      <button
                        className="expand-button"
                        onClick={() => toggleReviewExpansion(review.id)}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? 'Show less' : 'Show more'}
                      >
                        {isExpanded ? ' Show less' : ' Read more'}
                      </button>
                    )}
                  </blockquote>
                  
                  {review.photo && (
                    <div className="review-photo">
                      <img
                        src={review.photo}
                        alt="Customer's dining experience photo"
                        loading="lazy"
                        className="review-image"
                      />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Show More Button */}
        {visibleReviews < reviewsData.length && (
          <div className="reviews-actions">
            <button
              className="btn btn-accent show-more-btn"
              onClick={showMoreReviews}
              aria-label={`Show ${Math.min(3, reviewsData.length - visibleReviews)} more reviews`}
            >
              <span aria-hidden="true">📝</span>
              Show More Reviews ({reviewsData.length - visibleReviews} remaining)
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="reviews-cta">
          <p className="cta-text">Have you dined with us? We'd love to hear about your experience!</p>
          <a href="#contact" className="btn btn-primary cta-button">
            <span aria-hidden="true">✉️</span>
            Share Your Experience
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * StarRating component to display star ratings
 */
function StarRating({ rating, maxStars = 5 }) {
  const stars = [];
  
  for (let i = 1; i <= maxStars; i++) {
    let starClass = 'star';
    if (i <= Math.floor(rating)) {
      starClass += ' star-full';
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      starClass += ' star-half';
    } else {
      starClass += ' star-empty';
    }
    
    stars.push(
      <span key={i} className={starClass} aria-hidden="true">
        ★
      </span>
    );
  }
  
  return <div className="star-rating">{stars}</div>;
}

export default Reviews;
