'use client';

import { useState, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faCheckCircle,
  faSpinner,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import Section from './Section';

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
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({ message: '', type: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setStatus({
        message: 'Please fill in all required fields correctly.',
        type: 'error',
      });
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
          message: 'Thank you! Your message has been sent successfully.',
          type: 'success',
        });
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        setStatus({
          message: 'Something went wrong. Please try again later.',
          type: 'error',
        });
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
    <Section
      id="contact"
      className="contact-section"
      ariaLabelledBy="contact-heading"
    >
      <div className="contact-box">
        <h2 id="contact-heading" className="section-title">
          <span className="section-title-icon">
            <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
          </span>
          <span className="section-title-text">Get in Touch!</span>
        </h2>
        <p className="contact-intro">
          Have a question or just want to reach out? I&apos;d love to hear from you.
          Fill out the form below and I&apos;ll get back to you soon.
        </p>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Drop a name"
            required
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className="field-error" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-field">
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Wanna hear back? Add your email"
            required
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className="field-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-field">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Say hello or drop a note..."
            rows={6}
            required
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span id="message-error" className="field-error" role="alert">
              {errors.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={submitting || status.type === 'success'}
        >
          {submitting ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin aria-hidden="true" />
              <span>Sending...</span>
            </>
          ) : status.type === 'success' ? (
            <>
              <FontAwesomeIcon icon={faCheckCircle} aria-hidden="true" />
              <span>Message Sent</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
              <span>Send Message</span>
            </>
          )}
        </button>

        {status.message && (
          <div className={`status-message ${status.type}`} role="alert">
            {status.type === 'success' && (
              <FontAwesomeIcon icon={faCheckCircle} aria-hidden="true" />
            )}
            {status.message}
          </div>
        )}
        </form>
      </div>
    </Section>
  );
}
