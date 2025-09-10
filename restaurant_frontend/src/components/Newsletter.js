import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * PUBLIC_INTERFACE
 * Newsletter signup component for collecting customer email addresses.
 * Features input validation, success/failure feedback, accessibility support,
 * and full theme integration (light/dark modes).
 */
function Newsletter() {
  const { t } = useTranslation(['common', 'newsletter']);
  
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
      newErrors.email = t('newsletter:validation.email_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('newsletter:validation.email_invalid');
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('newsletter:validation.first_name_required');
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = t('newsletter:validation.first_name_min_length');
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
              {t('newsletter:title')}
            </h2>
            <p className="newsletter-subtitle">
              {t('newsletter:subtitle')}
            </p>
          </div>

          <div className="newsletter-form-wrapper">
            <form className="newsletter-form" onSubmit={handleSubmit} aria-label="Newsletter signup form">
              <div className="newsletter-form-content">
                <div className="newsletter-inputs">
                  <div className="newsletter-field">
                    <label htmlFor="newsletter-firstName" className="sr-only">
                      {t('newsletter:form.fields.first_name')}
                    </label>
                    <input
                      id="newsletter-firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={t('newsletter:form.placeholders.first_name')}
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
                      {t('newsletter:form.fields.email')}
                    </label>
                    <input
                      id="newsletter-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('newsletter:form.placeholders.email')}
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
                  aria-label={isSubmitting ? t('newsletter:form.submitting') : t('newsletter:form.submit')}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" aria-hidden="true"></span>
                      {t('newsletter:form.submitting')}
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true">✉️</span>
                      {t('newsletter:form.submit')}
                    </>
                  )}
                </button>
              </div>

              <div className="newsletter-privacy">
                <p className="privacy-text">
                  {t('newsletter:privacy')}
                </p>
              </div>
            </form>
          </div>

          {/* Benefits Section */}
          <div className="newsletter-benefits">
            <h3 className="benefits-title">{t('newsletter:benefits.title')}</h3>
            <ul className="benefits-list" aria-label="Newsletter benefits">
              {t('newsletter:benefits.items', { returnObjects: true }).map((item, index) => (
                <li key={index} className="benefit-item">
                  <span className="benefit-icon" aria-hidden="true">
                    {index === 0 && '🎉'}
                    {index === 1 && '🍽️'}
                    {index === 2 && '🎫'}
                    {index === 3 && '📰'}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
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
                  <h4>{t('newsletter:status.success.title')}</h4>
                  <p>{t('newsletter:status.success.message')}</p>
                </div>
              </div>
            ) : (
              <div className="status-content error">
                <span className="status-icon" aria-hidden="true">⚠️</span>
                <div>
                  <h4>{t('newsletter:status.error.title')}</h4>
                  <p>{t('newsletter:status.error.message')}</p>
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
