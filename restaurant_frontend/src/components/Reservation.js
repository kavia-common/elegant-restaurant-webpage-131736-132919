import React, { useState, useCallback, useContext } from 'react';

/**
 * PUBLIC_INTERFACE
 * Reservation component for booking tables at the restaurant.
 * Features date selection, time slot selection, party size, contact info,
 * form validation, and success/failure feedback.
 */
function Reservation() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    partySize: 2,
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  // Generate available time slots
  const timeSlots = [
    '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
    '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  // Generate next 30 days for date selection
  const getAvailableDates = useCallback(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  }, []);

  const availableDates = getAvailableDates();

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.partySize < 1 || formData.partySize > 12) {
      newErrors.partySize = 'Party size must be between 1 and 12';
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

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.2; // 80% success rate
      
      if (isSuccess) {
        setSubmitStatus('success');
        // Reset form on success
        setFormData({
          date: '',
          time: '',
          partySize: 2,
          name: '',
          email: '',
          phone: '',
          specialRequests: ''
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
    <section id="reservation" className="reservation" aria-label="Table reservation">
      <div className="container">
        <div className="reservation-header">
          <h2 className="section-title">Reserve Your Table</h2>
          <p className="section-subtitle">
            Book your dining experience at Casa Moderna. We'll confirm your reservation within 24 hours.
          </p>
        </div>

        <div className="reservation-content">
          <div className="reservation-form-wrapper">
            <form className="reservation-form" onSubmit={handleSubmit} aria-label="Reservation form">
              
              {/* Date and Time Selection */}
              <div className="form-section">
                <h3 className="form-section-title">
                  <span className="form-section-icon" aria-hidden="true">📅</span>
                  Date & Time
                </h3>
                
                <div className="form-row-group">
                  <div className="form-row">
                    <label htmlFor="reservation-date">Preferred Date</label>
                    <select
                      id="reservation-date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={errors.date ? 'error' : ''}
                      required
                    >
                      <option value="">Select a date</option>
                      {availableDates.map(date => (
                        <option key={date} value={date}>
                          {formatDateForDisplay(date)}
                        </option>
                      ))}
                    </select>
                    {errors.date && <span className="error-message">{errors.date}</span>}
                  </div>

                  <div className="form-row">
                    <label htmlFor="reservation-time">Preferred Time</label>
                    <select
                      id="reservation-time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={errors.time ? 'error' : ''}
                      required
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.time && <span className="error-message">{errors.time}</span>}
                  </div>

                  <div className="form-row">
                    <label htmlFor="party-size">Party Size</label>
                    <select
                      id="party-size"
                      name="partySize"
                      value={formData.partySize}
                      onChange={handleInputChange}
                      className={errors.partySize ? 'error' : ''}
                      required
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                    {errors.partySize && <span className="error-message">{errors.partySize}</span>}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="form-section">
                <h3 className="form-section-title">
                  <span className="form-section-icon" aria-hidden="true">👤</span>
                  Contact Information
                </h3>
                
                <div className="form-row-group">
                  <div className="form-row">
                    <label htmlFor="reservation-name">Full Name</label>
                    <input
                      id="reservation-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className={errors.name ? 'error' : ''}
                      required
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-row">
                    <label htmlFor="reservation-email">Email Address</label>
                    <input
                      id="reservation-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className={errors.email ? 'error' : ''}
                      required
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-row">
                    <label htmlFor="reservation-phone">Phone Number</label>
                    <input
                      id="reservation-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(123) 456-7890"
                      className={errors.phone ? 'error' : ''}
                      required
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-row">
                    <label htmlFor="special-requests">Special Requests (Optional)</label>
                    <textarea
                      id="special-requests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Dietary restrictions, occasion, seating preferences..."
                      rows="3"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-submit">
                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? 'Submitting reservation...' : 'Submit reservation'}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" aria-hidden="true"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true">🍽️</span>
                      Reserve Table
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Reservation Info */}
          <div className="reservation-info">
            <div className="info-card">
              <h3 className="info-title">
                <span aria-hidden="true">ℹ️</span>
                Reservation Information
              </h3>
              <ul className="info-list">
                <li>Reservations are confirmed within 24 hours</li>
                <li>Tables are held for 15 minutes past reservation time</li>
                <li>Parties of 6+ may require a deposit</li>
                <li>Cancellations accepted up to 2 hours before</li>
                <li>Special dietary needs can be accommodated with advance notice</li>
              </ul>
              
              <div className="contact-info">
                <p><strong>Need help?</strong></p>
                <p>Call us at <a href="tel:+1234567890" className="link">+1 (234) 567-890</a></p>
                <p>Email <a href="mailto:reservations@casamoderna.com" className="link">reservations@casamoderna.com</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {submitStatus && (
          <div className={`reservation-status ${submitStatus}`} role="alert" aria-live="polite">
            {submitStatus === 'success' ? (
              <div className="status-content success">
                <span className="status-icon" aria-hidden="true">✅</span>
                <div>
                  <h4>Reservation Submitted Successfully!</h4>
                  <p>Thank you! We've received your reservation request and will confirm within 24 hours via email.</p>
                </div>
              </div>
            ) : (
              <div className="status-content error">
                <span className="status-icon" aria-hidden="true">❌</span>
                <div>
                  <h4>Reservation Failed</h4>
                  <p>We're sorry, but there was an issue processing your reservation. Please try again or call us directly.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Reservation;
