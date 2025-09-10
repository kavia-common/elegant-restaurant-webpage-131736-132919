import React, { useState, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * PUBLIC_INTERFACE
 * Reservation component for booking tables at the restaurant.
 * Features date selection, time slot selection, party size, contact info,
 * form validation, and success/failure feedback.
 */
function Reservation() {
  const { t } = useTranslation(['common', 'reservation']);
  
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
      newErrors.date = t('reservation:validation.date_required');
    }

    if (!formData.time) {
      newErrors.time = t('reservation:validation.time_required');
    }

    if (!formData.name.trim()) {
      newErrors.name = t('reservation:validation.name_required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('reservation:validation.email_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('reservation:validation.email_invalid');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('reservation:validation.phone_required');
    } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t('reservation:validation.phone_invalid');
    }

    if (formData.partySize < 1 || formData.partySize > 12) {
      newErrors.partySize = t('reservation:validation.party_size_invalid');
    }

    return newErrors;
  }, [formData, t]);

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
          <h2 className="section-title">{t('reservation:title')}</h2>
          <p className="section-subtitle">
            {t('reservation:subtitle')}
          </p>
        </div>

        <div className="reservation-content">
          <div className="reservation-form-wrapper">
            <form className="reservation-form" onSubmit={handleSubmit} aria-label="Reservation form">
              
              {/* Date and Time Selection */}
              <div className="form-section">
                <h3 className="form-section-title">
                  <span className="form-section-icon" aria-hidden="true">📅</span>
                  {t('reservation:form.sections.datetime')}
                </h3>
                
                <div className="form-row-group">
                  <div className="form-row">
                    <label htmlFor="reservation-date">{t('reservation:form.fields.date')}</label>
                    <select
                      id="reservation-date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={errors.date ? 'error' : ''}
                      required
                    >
                      <option value="">{t('reservation:form.placeholders.date')}</option>
                      {availableDates.map(date => (
                        <option key={date} value={date}>
                          {formatDateForDisplay(date)}
                        </option>
                      ))}
                    </select>
                    {errors.date && <span className="error-message">{errors.date}</span>}
                  </div>

                  <div className="form-row">
                    <label htmlFor="reservation-time">{t('reservation:form.fields.time')}</label>
                    <select
                      id="reservation-time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={errors.time ? 'error' : ''}
                      required
                    >
                      <option value="">{t('reservation:form.placeholders.time')}</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.time && <span className="error-message">{errors.time}</span>}
                  </div>

                  <div className="form-row">
                    <label htmlFor="party-size">{t('reservation:form.fields.party_size')}</label>
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
                          {t('reservation:form.guest_count', { count: i + 1 })}
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
                  {t('reservation:form.sections.contact')}
                </h3>
                
                <div className="form-row-group">
                  <div className="form-row">
                    <label htmlFor="reservation-name">{t('reservation:form.fields.name')}</label>
                    <input
                      id="reservation-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('reservation:form.placeholders.name')}
                      className={errors.name ? 'error' : ''}
                      required
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-row">
                    <label htmlFor="reservation-email">{t('reservation:form.fields.email')}</label>
                    <input
                      id="reservation-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('reservation:form.placeholders.email')}
                      className={errors.email ? 'error' : ''}
                      required
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-row">
                    <label htmlFor="reservation-phone">{t('reservation:form.fields.phone')}</label>
                    <input
                      id="reservation-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t('reservation:form.placeholders.phone')}
                      className={errors.phone ? 'error' : ''}
                      required
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-row">
                    <label htmlFor="special-requests">{t('reservation:form.fields.special_requests')}</label>
                    <textarea
                      id="special-requests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder={t('reservation:form.placeholders.special_requests')}
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
                  aria-label={isSubmitting ? t('reservation:form.submitting') : t('reservation:form.submit')}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" aria-hidden="true"></span>
                      {t('reservation:form.submitting')}
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true">🍽️</span>
                      {t('reservation:form.submit')}
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
                {t('reservation:info.title')}
              </h3>
              <ul className="info-list">
                {t('reservation:info.rules', { returnObjects: true }).map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
              
              <div className="contact-info">
                <p><strong>{t('reservation:info.help')}</strong></p>
                <p>{t('reservation:info.phone', { phone: t('contact.info.phone') })}</p>
                <p>{t('reservation:info.email', { email: 'reservations@casamoderna.com' })}</p>
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
                  <h4>{t('reservation:status.success.title')}</h4>
                  <p>{t('reservation:status.success.message')}</p>
                </div>
              </div>
            ) : (
              <div className="status-content error">
                <span className="status-icon" aria-hidden="true">❌</span>
                <div>
                  <h4>{t('reservation:status.error.title')}</h4>
                  <p>{t('reservation:status.error.message')}</p>
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
