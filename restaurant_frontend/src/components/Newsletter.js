import React, { useState, useCallback } from 'react';

/**
 * PUBLIC_INTERFACE
 * Newsletter signup component for collecting customer email addresses.
 * Features input validation, success/failure feedback, accessibility support,
 * and full theme integration (light/dark modes).
 */
function Newsletter() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    return newErrors;
  }, [formData]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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
        setFormData({
          email: '',
          firstName: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  return (
    <section id="newsletter" className="newsletter" aria-label="Newsletter signup">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-header">
            <h2 className="newsletter-title">
              <span className="newsletter-icon" aria-hidden="true">📧</span>
              Stay in the Loop
            </h2>
            <p className="newsletter-subtitle">
              Subscribe to receive exclusive offers, seasonal menu updates, and invitations to special events.
            </p>
          </div>

          <div className="newsletter-form-wrapper">
            <form className="newsletter-form" onSubmit={handleSubmit} aria-label="Newsletter signup form">
              <div className="newsletter-form-content">
                <div className="newsletter-inputs">
                  <div className="newsletter-field">
                    <label htmlFor="newsletter-firstName" className="sr-only">
                      First Name
                    </label>
                    <input
                      id="newsletter-firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className={`newsletter-input ${errors.firstName ? 'error' : ''}`}
                      required
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    />
                    {errors.firstName && (
                      <span id="firstName-error" className="newsletter-error" role="alert">
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className="newsletter-field">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email Address
                    </label>
                    <input
                      id="newsletter-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className={`newsletter-input ${errors.email ? 'error' : ''}`}
                      required
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" className="newsletter-error" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="newsletter-submit btn btn-primary"
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? 'Subscribing...' : 'Subscribe to newsletter'}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" aria-hidden="true"></span>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true">✉️</span>
                      Subscribe
                    </>
                  )}
                </button>
              </div>

              <div className="newsletter-privacy">
                <p className="privacy-text">
                  We respect your privacy. Unsubscribe at any time. 
                  <a href="#contact" className="link"> Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>

          {/* Benefits Section */}
          <div className="newsletter-benefits">
            <h3 className="benefits-title">What you'll receive:</h3>
            <ul className="benefits-list" aria-label="Newsletter benefits">
              <li className="benefit-item">
                <span className="benefit-icon" aria-hidden="true">🎉</span>
                <span>Exclusive member-only offers and discounts</span>
              </li>
              <li className="benefit-item">
                <span className="benefit-icon" aria-hidden="true">🍽️</span>
                <span>First access to new seasonal menu items</span>
              </li>
              <li className="benefit-item">
                <span className="benefit-icon" aria-hidden="true">🎫</span>
                <span>Priority invitations to special events</span>
              </li>
              <li className="benefit-item">
                <span className="benefit-icon" aria-hidden="true">📰</span>
                <span>Monthly culinary tips and chef insights</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Status Messages */}
        {submitStatus && (
          <div className={`newsletter-status ${submitStatus}`} role="alert" aria-live="polite">
            {submitStatus === 'success' ? (
              <div className="status-content success">
                <span className="status-icon" aria-hidden="true">🎉</span>
                <div>
                  <h4>Welcome to the Casa Moderna Family!</h4>
                  <p>Thank you for subscribing! Check your email for a special welcome offer.</p>
                </div>
              </div>
            ) : (
              <div className="status-content error">
                <span className="status-icon" aria-hidden="true">⚠️</span>
                <div>
                  <h4>Subscription Failed</h4>
                  <p>We couldn't process your subscription right now. Please try again or contact us directly.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
