import React from 'react'
import './About.css'

export default function About() {
  return (
    <div className="page-about">
      {/* 1. HERO SECTION (Dark theme) */}
      <section className="about-hero section-dark">
        <div className="container about-hero__content">
          <span className="section-label">About LogiSetu</span>
          <h1 className="about-hero__title">
            Built to close India's logistics infrastructure gap
          </h1>
          <p className="about-hero__subtitle">
            We are a logistics infrastructure company built to solve one of India's biggest structural challenges: the gap between economic ambition and the physical and digital infrastructure needed to move goods efficiently.
          </p>
        </div>
      </section>

      {/* 2. MISSION SECTION (Light theme) */}
      <section className="mission-sec section-light">
        <div className="container grid-2 mission-sec__inner">
          <div className="mission-sec__content">
            <span className="section-label">Our Mission</span>
            <h2 className="section-title">
              Infrastructure that moves India forward
            </h2>
            <p className="mission-sec__desc">
              India's economy is growing faster than its logistics infrastructure. Fragmented warehousing, limited cold chain, and underdeveloped multimodal connectivity add cost and friction at every stage of the supply chain — from farm to factory to final mile.
            </p>
            <p className="mission-sec__desc">
              LogiSetu was founded to close that gap: to design, build and operate the modern logistics infrastructure that India's manufacturing, e-commerce, agriculture and trade sectors need to compete globally.
            </p>
          </div>

          <div className="mission-sec__visual">
            <div className="bar-chart-container card-light">
              <h4 className="bar-chart-title">Logistics Infrastructure Development</h4>
              <div className="bar-chart">
                <div className="bar-item">
                  <div className="bar-item__fill" style={{ height: '35%' }}></div>
                  <span className="bar-item__label">Phase 1</span>
                </div>
                <div className="bar-item">
                  <div className="bar-item__fill" style={{ height: '50%' }}></div>
                  <span className="bar-item__label">Phase 2</span>
                </div>
                <div className="bar-item bar-item--active">
                  <div className="bar-item__fill" style={{ height: '75%' }}>
                    <span className="bar-item__tag">2026 →</span>
                  </div>
                  <span className="bar-item__label">Today</span>
                </div>
                <div className="bar-item">
                  <div className="bar-item__fill" style={{ height: '95%' }}></div>
                  <span className="bar-item__label">Scale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR APPROACH SECTION (Light theme, white cards) */}
      <section className="approach-sec section-light">
        <div className="container">
          <div className="text-center-wrapper">
            <span className="section-label">Our Approach</span>
            <h2 className="section-title">How we build</h2>
          </div>

          <div className="grid-4 approach-sec__grid">
            <div className="approach-card card-light">
              <div className="approach-card__num">01</div>
              <h3 className="approach-card__title">Infrastructure First</h3>
              <p className="approach-card__desc">
                We start with land, design and construction — the physical assets that everything else depends on — before layering on operations and technology.
              </p>
            </div>

            <div className="approach-card card-light">
              <div className="approach-card__num">02</div>
              <h3 className="approach-card__title">Technology-Enabled</h3>
              <p className="approach-card__desc">
                Every facility is built with visibility and data in mind, so operators and partners can track, plan and optimise from day one.
              </p>
            </div>

            <div className="approach-card card-light">
              <div className="approach-card__num">03</div>
              <h3 className="approach-card__title">Capital Discipline</h3>
              <p className="approach-card__desc">
                Phased development keeps capital deployment manageable and de-risks each stage, for us and for our partners.
              </p>
            </div>

            <div className="approach-card card-light">
              <div className="approach-card__num">04</div>
              <h3 className="approach-card__title">Long-Term Partnership</h3>
              <p className="approach-card__desc">
                We build relationships designed to last multiple development cycles — with investors, operators, and government partners alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP & TEAM SECTION (Light theme) */}
      <section className="team-sec section-light">
        <div className="container team-sec__inner">
          <div className="text-center-wrapper">
            <span className="section-label">Leadership & Team</span>
            <h2 className="section-title">A team built across two geographies</h2>
            <p className="section-subtitle">
              LogiSetu is led by a team with experience spanning logistics infrastructure, international trade and capital markets across India and the Gulf. Our leadership pairs on-ground execution capability in India with a global network of capital and advisory relationships across the UAE and UK.
            </p>
          </div>
        </div>
      </section>

      {/* 5. WHERE WE OPERATE SECTION (Light theme, white cards) */}
      <section className="operate-sec section-light">
        <div className="container">
          <div className="text-center-wrapper">
            <span className="section-label">Where We Operate</span>
            <h2 className="section-title">Local execution, global reach</h2>
          </div>

          <div className="grid-3 operate-sec__grid">
            <div className="operate-card card-light">
              <div className="operate-card__icon-box">
                <svg className="operate-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="operate-card__title">Dubai</h3>
              <p className="operate-card__desc">
                Global headquarters — strategy, capital structuring and cross-border trade relationships.
              </p>
            </div>

            <div className="operate-card card-light">
              <div className="operate-card__icon-box">
                <svg className="operate-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 18.5C8.41 18.5 5.5 15.59 5.5 12C5.5 8.41 8.41 5.5 12 5.5C15.59 5.5 18.5 8.41 18.5 12C18.5 15.59 15.59 18.5 12 18.5ZM12 8.5C10.07 8.5 8.5 10.07 8.5 12C8.5 13.93 10.07 15.5 12 15.5C13.93 15.5 15.5 13.93 15.5 12C15.5 10.07 13.93 8.5 12 8.5Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="operate-card__title">India</h3>
              <p className="operate-card__desc">
                On-the-ground project execution, government liaison and operations across target states.
              </p>
            </div>

            <div className="operate-card card-light">
              <div className="operate-card__icon-box">
                <svg className="operate-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="operate-card__title">UAE & UK</h3>
              <p className="operate-card__desc">
                Our network of NRI and international investors, advisors and strategic partners.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
