import React from 'react'
import { Link } from 'react-router-dom'
import './Solutions.css'

const solutionsList = [
  {
    title: 'Grade A Warehousing & Logistics Parks',
    desc: 'Institutional-grade warehousing and integrated logistics parks with container yard facilities, designed for long-term operators and 3PLs.',
    pills: ['Warehousing', '3PL', 'Container Freight'],
    icon: (
      <svg className="sol-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 4H5C3.9 4 3 4.9 3 6V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V6C21 4.9 20.1 4 19 4ZM19 18H5V8H19V18Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    title: 'Multimodal Freight Terminals',
    desc: 'Rail, road and container yard terminal integration that reduces transshipment cost and time across long-haul freight corridors.',
    pills: ['Rail', 'Road', 'Freight'],
    icon: (
      <svg className="sol-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 19V21H22V19H20V12H16V19H8V8H12V6H4V19H2ZM14 10H10V12H14V10ZM14 14H10V16H14V14Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    title: 'Cold Chain & Agri-Logistics Infrastructure',
    desc: 'Temperature-controlled storage and handling infrastructure that reduces post-harvest losses and connects agriculture and pharma to market faster.',
    pills: ['Agriculture', 'Pharma', 'Cold Storage'],
    icon: (
      <svg className="sol-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H17.82L19.41 10.41L18 9L15 12H13V10L16 7L14.59 5.59L13 7.18V6H11V7.18L9.41 5.59L8 7L11 10V12H9L6 9L4.59 10.41L6.18 12H5C3.9 12 3 12.9 3 14V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V14C21 12.9 20.1 12 19 12Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    title: 'E-Commerce Fulfillment Infrastructure',
    desc: 'Purpose-built fulfillment and sortation infrastructure for express delivery and e-commerce operators scaling across India.',
    pills: ['E-Commerce', 'Last-Mile', 'Fulfillment'],
    icon: (
      <svg className="sol-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V6H20V18ZM10 12L8 9L5 13H19L14 7L10 12Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    title: 'Customs & Cross-Border Trade Facilitation',
    desc: 'On-site customs clearance capability that shortens the distance between production and export ports, supporting regional trade.',
    pills: ['Customs', 'Export', 'Cross-Border'],
    icon: (
      <svg className="sol-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    title: 'Logistics Technology & Digital Supply Chain',
    desc: 'Supply-chain visibility software, warehouse management systems and data infrastructure that make physical assets efficient to operate.',
    pills: ['Software', 'Data', 'Visibility'],
    icon: (
      <svg className="sol-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 18C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H0V20H24V18H20ZM4 4H20V14H4V4Z" fill="currentColor"/>
      </svg>
    )
  }
]

const targetAudience = [
  {
    title: 'Manufacturers',
    desc: 'Industrial and manufacturing supply chains that need reliable, scalable storage and distribution.'
  },
  {
    title: 'E-Commerce & Retail',
    desc: 'Fulfillment and last-mile operators scaling delivery networks across India.'
  },
  {
    title: 'Agriculture & Pharma',
    desc: 'Cold chain-dependent supply chains that need to move fast without losing quality.'
  },
  {
    title: 'Trade & Export',
    desc: "Businesses moving goods across India's borders and into international markets."
  }
]

export default function Solutions() {
  return (
    <div className="page-solutions">
      {/* 1. HERO SECTION (Dark theme) */}
      <section className="sol-hero section-dark">
        <div className="container sol-hero__content">
          <span className="section-label">Solutions</span>
          <h1 className="sol-hero__title">
            End-to-end logistics infrastructure, engineered for scale
          </h1>
          <p className="sol-hero__subtitle">
            From land to lease, LogiSetu designs, builds and operates the infrastructure that modern Indian supply chains depend on.
          </p>
        </div>
      </section>

      {/* 2. DETAILED SOLUTIONS GRID (Light theme, white cards) */}
      <section className="sol-grid-sec section-light">
        <div className="container grid-2 sol-grid-sec__grid">
          {solutionsList.map((sol, idx) => (
            <div key={idx} className="sol-card card-light">
              <div className="sol-card__header">
                <div className="sol-card__icon-box">{sol.icon}</div>
                <h3 className="sol-card__title">{sol.title}</h3>
              </div>
              <p className="sol-card__desc">{sol.desc}</p>
              <div className="sol-card__pills">
                {sol.pills.map((pill, pIdx) => (
                  <span key={pIdx} className="sol-card__pill">{pill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHO WE BUILD FOR SECTION (Light theme, white cards) */}
      <section className="shipper-sec section-light">
        <div className="container">
          <div className="text-center-wrapper">
            <span className="section-label">Who We Build For</span>
            <h2 className="section-title">Infrastructure for every kind of shipper</h2>
          </div>

          <div className="grid-4 shipper-sec__grid">
            {targetAudience.map((audience, idx) => (
              <div key={idx} className="shipper-card card-light">
                <h3 className="shipper-card__title">{audience.title}</h3>
                <p className="shipper-card__desc">{audience.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA BANNER (Light theme) */}
      <section className="sol-cta-sec section-light">
        <div className="container sol-cta-sec__inner">
          <h2 className="sol-cta-sec__title">Looking for logistics infrastructure partners?</h2>
          <p className="sol-cta-sec__subtitle">Tell us what you're building and we'll tell you how LogiSetu fits in.</p>
          <div style={{ marginTop: '2.5rem' }}>
            <Link to="/contact" className="btn btn-primary">Talk to Us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
