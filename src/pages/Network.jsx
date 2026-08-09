import React from 'react'
import { Link } from 'react-router-dom'
import './Network.css'

export default function Network() {
  return (
    <div className="page-network">
      {/* 1. HERO SECTION (Dark theme) */}
      <section className="net-hero section-dark">
        <div className="container net-hero__content">
          <span className="section-label">Network & Investment</span>
          <h1 className="net-hero__title">
            Local execution in India. Global capital behind it.
          </h1>
          <p className="net-hero__subtitle">
            LogiSetu connects on-the-ground logistics infrastructure delivery in India with a strategic investor and NRI capital network spanning the UAE and United Kingdom.
          </p>
        </div>
      </section>

      {/* 2. THREE GEOGRAPHIES FOOTPRINT (Light theme, white cards) */}
      <section className="footprint-sec section-light">
        <div className="container">
          <div className="text-center-wrapper">
            <span className="section-label">Our Footprint</span>
            <h2 className="section-title">Three geographies, one mission</h2>
          </div>

          <div className="grid-3 footprint-sec__grid">
            <div className="foot-card card-light">
              <div className="foot-card__icon-box">
                <svg className="foot-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="foot-card__title">Dubai — Global Headquarters</h3>
              <p className="foot-card__desc">
                Strategy, capital structuring and cross-border trade relationships are anchored from our Dubai headquarters — a natural bridge between global capital and the Indian subcontinent.
              </p>
            </div>

            <div className="foot-card card-light">
              <div className="foot-card__icon-box">
                <svg className="foot-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="foot-card__title">UK & NRI Capital Network</h3>
              <p className="foot-card__desc">
                LogiSetu is supported by a growing base of strategic investors and NRI capital partners across the United Kingdom — individuals and family offices aligned with our long-term vision for Indian logistics infrastructure.
              </p>
            </div>

            <div className="foot-card card-light">
              <div className="foot-card__icon-box">
                <svg className="foot-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 18.5C8.41 18.5 5.5 15.59 5.5 12C5.5 8.41 8.41 5.5 12 5.5C15.59 5.5 18.5 8.41 18.5 12C18.5 15.59 15.59 18.5 12 18.5ZM12 8.5C10.07 8.5 8.5 10.07 8.5 12C8.5 13.93 10.07 15.5 12 15.5C13.93 15.5 15.5 13.93 15.5 12C15.5 10.07 13.93 8.5 12 8.5Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="foot-card__title">India — Execution on the Ground</h3>
              <p className="foot-card__desc">
                Project delivery, government liaison and day-to-day operations are run by teams based in India, close to the land, the regulators, and the customers we build for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STRATEGIC CAPITAL ANALYSIS (Light theme) */}
      <section className="capital-sec section-light">
        <div className="container grid-2 capital-sec__inner">
          <div className="capital-sec__content">
            <span className="section-label">Strategic Capital, Global Reach</span>
            <h2 className="section-title">Why global capital, built for India</h2>
            <p className="capital-sec__desc">
              Logistics infrastructure requires patient, long-horizon capital — the kind that understands multi-phase development and multi-year timelines. LogiSetu's investment network across the UAE and UK brings exactly that: capital comfortable with infrastructure-grade returns, paired with a genuine interest in India's growth story.
            </p>
            <p className="capital-sec__desc">
              Much of this network is built through the NRI and diaspora community — investors and family offices with roots in India and capital based abroad, looking for credible, professionally run ways to participate in India's infrastructure build-out.
            </p>

            <ul className="capital-sec__checklist">
              <li>
                <span className="checklist-icon">✓</span>
                Strategic and NRI investor relationships across the UAE and UK
              </li>
              <li>
                <span className="checklist-icon">✓</span>
                Infrastructure-grade, long-horizon capital approach
              </li>
              <li>
                <span className="checklist-icon">✓</span>
                Local execution teams accountable for on-the-ground delivery
              </li>
            </ul>
          </div>

          <div className="capital-sec__visual">
            <svg viewBox="0 0 500 280" className="network-map">
              <path d="M 120 220 Q 250 140, 310 130" fill="none" stroke="url(#netGrad)" strokeWidth="2.5" className="glow-arc" />
              <path d="M 310 130 Q 380 90, 420 80" fill="none" stroke="url(#netGrad)" strokeWidth="2" className="glow-arc" />
              <path d="M 120 220 Q 270 120, 420 80" fill="none" stroke="rgba(229, 131, 36, 0.3)" strokeWidth="1.5" strokeDasharray="5,5" />

              <defs>
                <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DF8F36" />
                  <stop offset="100%" stopColor="#1A2F5C" />
                </linearGradient>
              </defs>

              <g className="city-group">
                <circle cx="420" cy="80" r="7" fill="#E58324" />
                <circle cx="420" cy="80" r="14" fill="none" stroke="#E58324" strokeWidth="1" className="city-pulse" />
                <text x="420" y="60" className="city-name" textAnchor="middle">London</text>
                <text x="420" y="70" className="city-sub" textAnchor="middle">NRI & Investor</text>
              </g>

              <g className="city-group">
                <circle cx="310" cy="130" r="7" fill="#E58324" />
                <circle cx="310" cy="130" r="14" fill="none" stroke="#E58324" strokeWidth="1" className="city-pulse" />
                <text x="325" y="130" className="city-name text-start">Dubai</text>
                <text x="325" y="140" className="city-sub text-start">Global HQ</text>
              </g>

              <g className="city-group">
                <circle cx="120" cy="220" r="9" fill="#1A2F5C" stroke="#E58324" strokeWidth="2" />
                <circle cx="120" cy="220" r="18" fill="none" stroke="rgba(229, 131, 36, 0.6)" strokeWidth="1.5" className="city-pulse" />
                <text x="120" y="243" className="city-name" textAnchor="middle">India</text>
                <text x="120" y="253" className="city-sub" textAnchor="middle">Execution Hub</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* 4. INVESTOR RELATION CTA BANNER (Dark theme) */}
      <section className="net-cta-sec section-dark">
        <div className="container net-cta-sec__inner">
          <span className="section-label">Investor Relations</span>
          <h2 className="net-cta-sec__title">Interested in India's logistics infrastructure story?</h2>
          <p className="net-cta-sec__subtitle">
            We work with a select group of strategic and NRI investors across the UAE and UK. If you'd like to learn more about LogiSetu's investment approach, get in touch directly.
          </p>
          <div style={{ marginTop: '3rem' }}>
            <Link to="/contact" className="btn btn-primary">Contact Investor Relations</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
