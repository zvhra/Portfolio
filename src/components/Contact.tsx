'use client';

import React, { useState, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faCheckCircle,
  faSpinner,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({ message: '', type: '' });
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        break;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10)
          return 'Message must be at least 10 characters';
        break;
    }
    return undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setStatus({ message: '', type: '' });

    try {
      const response = await fetch('https://formspree.io/f/mwpejrpl', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.currentTarget),
      });

      if (response.ok) {
        setStatus({
          message: 'Thank you! Your message has been submitted successfully.',
          type: 'success',
        });
        setFormData({ name: '', email: '', message: '' });
        setTouched({});
        setErrors({});
      } else {
        const data = await response.json();
        const errorMsg =
          data.errors?.map((err: { message: string }) => err.message).join(', ') ||
          'Submission failed. Please try again later.';
        setStatus({ message: errorMsg, type: 'error' });
      }
    } catch {
      setStatus({
        message: 'An error occurred. Please try again later.',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading">Get in Touch!</h2>
      <p className="contact-intro">
        Have a question or just want to reach out? I&apos;d love to hear from you.
        Fill out the form below and I&apos;ll get back to you soon.
      </p>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your name"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && (
            <span id="name-error" className="error-message" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email Address <span className="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="your.email@example.com"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && (
            <span id="email-error" className="error-message" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">
            Message <span className="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Write your message here..."
            required
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={errors.message ? 'error' : ''}
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          {errors.message && (
            <span id="message-error" className="error-message" role="alert">
              {errors.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className={`submit-btn ${submitting ? 'submitting' : ''} ${status.type}`}
          disabled={submitting || status.type === 'success'}
          aria-busy={submitting}
        >
          {submitting ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin />
              <span>Sending...</span>
            </>
          ) : status.type === 'success' ? (
            <>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>Message Sent</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPaperPlane} />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>

      {status.message && (
        <div
          className={`status-message ${status.type === 'success' ? 'success' : 'error'}`}
          role="alert"
          aria-live="polite"
        >
          {status.type === 'error' && (
            <FontAwesomeIcon icon={faExclamationCircle} />
          )}
          {status.type === 'success' && (
            <FontAwesomeIcon icon={faCheckCircle} />
          )}
          {status.message}
        </div>
      )}
    </section>
  );
}

