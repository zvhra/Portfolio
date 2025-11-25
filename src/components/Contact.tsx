'use client';

import React, { useState, FormEvent } from 'react';
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

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
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
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <h2 id="contact-heading" className="section-title">
        <span className="section-title-icon">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <span className="section-title-text">Get in Touch!</span>
      </h2>
      <p className="contact-intro">
        Have a question or just want to reach out? I&apos;d love to hear from you.
        Fill out the form below and I&apos;ll get back to you soon.
      </p>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Drop a name"
          required
        />

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Wanna hear back? Add your email"
          required
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Say hello or drop a note..."
          rows={6}
          required
        />

        <button
          type="submit"
          className="submit-btn"
          disabled={submitting || status.type === 'success'}
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

        {status.message && (
          <div className={`status-message ${status.type}`} role="alert">
            {status.type === 'success' && (
              <FontAwesomeIcon icon={faCheckCircle} />
            )}
            {status.message}
          </div>
        )}
      </form>
    </Section>
  );
}
