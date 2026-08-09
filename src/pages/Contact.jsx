import React, { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    reason: 'General Enquiry',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        organisation: '',
        email: '',
        reason: 'General Enquiry',
        message: ''
      })
    }, 3000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="page-contact">
      {/* 1. HERO SECTION (Dark theme) */}
      <section className="contact-hero section-dark">
        <div className="container contact-hero__content">
          <span className="section-label">Contact</span>
          <h1 className="contact-hero__title">Let's talk</h1>
          <p className="contact-hero__subtitle">
            Partnership enquiries, investor relations, or general questions — reach out and the LogiSetu team will get back to you.
          </p>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT (Light theme, white cards) */}
      <section className="contact-details-sec section-light">
        <div className="container grid-2 contact-details-sec__inner">
          {/* Left Column: Coordinates */}
          <div className="contact-coords">
            <span className="section-label">Get in Touch</span>
            <h2 className="contact-coords__title">We'd like to hear from you</h2>
            
            <div className="coords-list">
              <div className="coord-item">
                <span className="coord-item__label">EMAIL</span>
                <a href="mailto:vineetgiri007@gmail.com" className="coord-item__val coord-item__val--link">
                  vineetgiri007@gmail.com
                </a>
              </div>

              <div className="coord-item">
                <span className="coord-item__label">HEADQUARTERS</span>
                <span className="coord-item__val">Dubai, United Arab Emirates</span>
              </div>

              <div className="coord-item">
                <span className="coord-item__label">INVESTOR RELATIONS</span>
                <span className="coord-item__val">
                  For UAE & UK investor enquiries, use the form and select "Investor Relations".
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: White Form Card */}
          <div className="contact-form-container">
            <div className="contact-form-card card-light">
              {submitted ? (
                <div className="form-success-message">
                  <svg className="success-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
                  </svg>
                  <h3>Thank you for reaching out!</h3>
                  <p>Our team has received your message and will respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-group__label">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-group__input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="organisation" className="form-group__label">Organisation</label>
                    <input
                      type="text"
                      id="organisation"
                      name="organisation"
                      className="form-group__input"
                      value={formData.organisation}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-group__label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-group__input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="reason" className="form-group__label">Reason</label>
                    <select
                      id="reason"
                      name="reason"
                      className="form-group__select"
                      value={formData.reason}
                      onChange={handleChange}
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Investor Relations">Investor Relations</option>
                      <option value="Partnership">Partnership / State Agencies</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-group__label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      className="form-group__textarea"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="form-submit-btn">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
