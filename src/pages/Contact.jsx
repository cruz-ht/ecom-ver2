

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: '',
    newsletter: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const validate = () => {
    const newErrors = {};

    // minimum 3 characters, no blank/spaces only
    if (formData.name.trim() === '' || formData.name.trim().length < 3) {
      newErrors.name = 'Please enter a valid name (minimum 3 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (formData.reason === '') {
      newErrors.reason = 'Please choose a reason.';
    }

    const msgLength = formData.message.trim().length;
    if (msgLength < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    } else if (msgLength > 250) {
      newErrors.message = 'Message must be less than 250 characters.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      setSuccess('');
    } else {
      setErrors({});
      setSuccess('Your form has been sent successfully!');
      setFormData({ name: '', email: '', reason: '', message: '', newsletter: false });

      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <>
      <Navbar />

      <h1 className="contact-title">CONTACT US</h1>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>

        {/* NAME */}
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        <p className={`error-text ${errors.name ? 'show' : ''}`} aria-live="polite">
          {errors.name}
        </p>

        {/* EMAIL */}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        <p className={`error-text ${errors.email ? 'show' : ''}`} aria-live="polite">
          {errors.email}
        </p>

        {/* DROPDOWN */}
        <select
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className={errors.reason ? 'error' : ''}
        >
          <option value="" disabled>Reason for Contact</option>
          <option value="order">Order Issue</option>
          <option value="restock">Restock Request</option>
          <option value="general">General Question</option>
          <option value="shipping">Shipping Question</option>
          <option value="other">Other</option>
        </select>
        <p className={`error-text ${errors.reason ? 'show' : ''}`} aria-live="polite">
          {errors.reason}
        </p>

        {/* MESSAGE */}
        <textarea
          id="message"
          name="message"
          placeholder="Message:"
          rows="7"
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? 'error' : ''}
        />
        <p className={`error-text ${errors.message ? 'show' : ''}`} aria-live="polite">
          {errors.message}
        </p>

        {/* NEWSLETTER */}
        <label className="news-checkbox">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
          />
          Sign up for our weekly newsletter to get the latest updates and offers!
        </label>

        <button className="submit-btn" type="submit">Submit</button>
        <p className={`success-text ${success ? 'show' : ''}`}>{success}</p>

      </form>

      <Footer />
    </>
  );
}

export default Contact;