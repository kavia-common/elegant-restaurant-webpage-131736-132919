import React, { useState, useCallback } from 'react';

/**
 * PUBLIC_INTERFACE
 * Loyalty Program component for highlighting member benefits, rewards system,
 * and special offers for repeat customers. Features member signup, benefits showcase,
 * accessibility support, and full theme integration (light/dark modes).
 */
function LoyaltyProgram() {
  const [membershipData, setMembershipData] = useState({
    email: '',
    firstName: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [showSignupForm, setShowSignupForm] = useState(false);

  // Loyalty program benefits data
  const memberBenefits = [
    {
      id: 1,
      icon: '🎯',
      title: 'Earn Points Every Visit',
      description: 'Earn 1 point for every dollar spent. Redeem 100 points for $10 off your bill.',
      highlight: 'Earn 1 point = $1 spent'
    },
    {
      id: 2,
      icon: '🎂',
      title: 'Birthday Rewards',
      description: 'Celebrate with us! Get a complimentary dessert and special birthday surprise.',
      highlight: 'Free birthday dessert'
    },
    {
      id: 3,
      icon: '🥂',
      title: 'Member-Only Events',
      description: 'Exclusive access to wine tastings, chef tables, and special seasonal dinners.',
      highlight: 'VIP event invitations'
    },
    {
      id: 4,
      icon: '💰',
      title: 'Double Points Days',
      description: 'Enjoy double points on special occasions and member appreciation days.',
      highlight: '2x points special days'
    },
    {
      id: 5,
      icon: '🎁',
      title: 'Welcome Bonus',
      description: 'New members receive 50 bonus points and 10% off their first visit.',
      highlight: '50 points + 10% off'
    },
    {
      id: 6,
      icon: '⚡',
      title: 'Priority Reservations',
      description: 'Skip the wait with priority booking and exclusive reservation windows.',
      highlight: 'VIP reservation access'
    }
  ];

  // Current special offers
  const specialOffers = [
    {
      id: 1,
      type: 'limited-time',
      title: 'New Member Special',
      description: 'Join today and get 50 bonus points plus 10% off your first meal.',
      validUntil: '2024-02-29',
      code: 'WELCOME10',
      featured: true
    },
    {
      id: 2,
      type: 'member-exclusive',
      title: 'Double Points Weekend',
      description: 'This Saturday & Sunday only - earn double points on all purchases.',
      validUntil: '2024-02-04',
      code: 'DOUBLE2X',
      featured: false
    },
    {
      id: 3,
      type: 'birthday',
      title: 'Birthday Month Celebration',
      description: 'Celebrate all month long with a free appetizer on every visit during your birthday month.',
      validUntil: 'During birthday month',
      code: 'BIRTHDAY',
      featured: false
    }
  ];

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!membershipData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(membershipData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!membershipData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (membershipData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!membershipData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(membershipData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    return newErrors;
  }, [membershipData]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setMembershipData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Simulate random success/failure for demo (90% success rate)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setSubmitStatus('success');
        // Reset form on success
        setMembershipData({
          email: '',
          firstName: '',
          phone: ''
        });
        setShowSignupForm(false);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [membershipData, validateForm]);

  const toggleSignupForm = useCallback(() => {
    setShowSignupForm(prev => !prev);
    setSubmitStatus(null);
    setErrors({});
  }, []);

  return (
    <section id="loyalty" className="loyalty-program" aria-label="Loyalty program and member benefits">
      <div className="container">
        {/* Header Section */}
        <div className="loyalty-header">
          <h2 className="loyalty-title">
            <span className="loyalty-icon" aria-hidden="true">⭐</span>
            Casa Moderna Rewards
          </h2>
          <p className="loyalty-subtitle">
            Join our exclusive loyalty program and unlock amazing benefits, rewards, and member-only experiences.
          </p>
        </div>

        {/* Current Offers Section */}
        <div className="current-offers-section">
          <h3 className="offers-title">Current Member Offers</h3>
          <div className="offers-grid">
            {specialOffers.map((offer) => (
              <div key={offer.id} className={`offer-card ${offer.featured ? 'featured' : ''}`}>
                <div className="offer-header">
                  <span className={`offer-badge ${offer.type}`}>
                    {offer.type === 'limited-time' && '🔥'}
                    {offer.type === 'member-exclusive' && '👑'}
                    {offer.type === 'birthday' && '🎂'}
                    {offer.type.replace('-', ' ').toUpperCase()}
                  </span>
                  {offer.featured && (
                    <span className="featured-badge" aria-label="Featured offer">
                      NEW
                    </span>
                  )}
                </div>
                <div className="offer-content">
                  <h4 className="offer-title">{offer.title}</h4>
                  <p className="offer-description">{offer.description}</p>
                  <div className="offer-details">
                    <span className="offer-code">Code: <strong>{offer.code}</strong></span>
                    <span className="offer-validity">Valid until: {offer.validUntil}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="loyalty-main">
          {/* Benefits Section */}
          <div className="benefits-section">
            <h3 className="benefits-title">Member Benefits</h3>
            <div className="benefits-grid">
              {memberBenefits.map((benefit) => (
                <div key={benefit.id} className="benefit-card">
                  <div className="benefit-icon" aria-hidden="true">
                    {benefit.icon}
                  </div>
                  <div className="benefit-content">
                    <h4 className="benefit-title">{benefit.title}</h4>
                    <p className="benefit-description">{benefit.description}</p>
                    <span className="benefit-highlight">{benefit.highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signup Section */}
          <div className="signup-section">
            <div className="signup-card">
              <h3 className="signup-title">
                <span aria-hidden="true">🎉</span>
                Ready to Start Earning Rewards?
              </h3>
              <p className="signup-description">
                Join Casa Moderna Rewards today and start earning points on every visit. It's free and easy!
              </p>

              {!showSignupForm ? (
                <div className="signup-cta">
                  <button
                    className="btn btn-primary btn-large signup-btn"
                    onClick={toggleSignupForm}
                    aria-label="Join loyalty program"
                  >
                    <span aria-hidden="true">⭐</span>
                    Join Now - It's Free!
                  </button>
                  <p className="signup-note">
                    Already a member? <a href="#contact" className="link">Sign in here</a>
                  </p>
                </div>
              ) : (
                <form className="signup-form" onSubmit={handleSubmit} aria-label="Loyalty program signup form">
                  <div className="signup-form-content">
                    <div className="signup-inputs">
                      <div className="signup-field">
                        <label htmlFor="loyalty-firstName" className="sr-only">
                          First Name
                        </label>
                        <input
                          id="loyalty-firstName"
                          name="firstName"
                          type="text"
                          value={membershipData.firstName}
                          onChange={handleInputChange}
                          placeholder="First name"
                          className={`signup-input ${errors.firstName ? 'error' : ''}`}
                          required
                          aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                        />
                        {errors.firstName && (
                          <span id="firstName-error" className="signup-error" role="alert">
                            {errors.firstName}
                          </span>
                        )}
                      </div>

                      <div className="signup-field">
                        <label htmlFor="loyalty-email" className="sr-only">
                          Email Address
                        </label>
                        <input
                          id="loyalty-email"
                          name="email"
                          type="email"
                          value={membershipData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className={`signup-input ${errors.email ? 'error' : ''}`}
                          required
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                          <span id="email-error" className="signup-error" role="alert">
                            {errors.email}
                          </span>
                        )}
                      </div>

                      <div className="signup-field">
                        <label htmlFor="loyalty-phone" className="sr-only">
                          Phone Number
                        </label>
                        <input
                          id="loyalty-phone"
                          name="phone"
                          type="tel"
                          value={membershipData.phone}
                          onChange={handleInputChange}
                          placeholder="(123) 456-7890"
                          className={`signup-input ${errors.phone ? 'error' : ''}`}
                          required
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                        />
                        {errors.phone && (
                          <span id="phone-error" className="signup-error" role="alert">
                            {errors.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="signup-actions">
                      <button
                        type="submit"
                        className="signup-submit btn btn-primary"
                        disabled={isSubmitting}
                        aria-label={isSubmitting ? 'Joining program...' : 'Join loyalty program'}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner" aria-hidden="true"></span>
                            Joining...
                          </>
                        ) : (
                          <>
                            <span aria-hidden="true">🎯</span>
                            Join Now
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn-text"
                        onClick={toggleSignupForm}
                        aria-label="Cancel signup"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  <div className="signup-privacy">
                    <p className="privacy-text">
                      By joining, you agree to our <a href="#contact" className="link">Terms & Conditions</a> and <a href="#contact" className="link">Privacy Policy</a>.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {submitStatus && (
          <div className={`loyalty-status ${submitStatus}`} role="alert" aria-live="polite">
            {submitStatus === 'success' ? (
              <div className="status-content success">
                <span className="status-icon" aria-hidden="true">🎉</span>
                <div>
                  <h4>Welcome to Casa Moderna Rewards!</h4>
                  <p>You've successfully joined our loyalty program. Check your email for your welcome bonus and membership details.</p>
                </div>
              </div>
            ) : (
              <div className="status-content error">
                <span className="status-icon" aria-hidden="true">⚠️</span>
                <div>
                  <h4>Signup Failed</h4>
                  <p>We couldn't process your membership signup right now. Please try again or contact us directly.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default LoyaltyProgram;
