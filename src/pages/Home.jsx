import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Home.css'

export default function Home() {
  return (
    <div className="page-home">
      {/* 1. HERO SECTION (Dark theme) */}
      <section className="hero-sec section-dark">
        <div className="container hero-sec__content">
          <motion.span 
            className="hero-sec__badge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Global Logistics Infrastructure
          </motion.span>
          
          <motion.h1 
            className="hero-sec__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Engineering India's Next-Generation Logistics Infrastructure
          </motion.h1>
          
          <motion.p 
            className="hero-sec__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            LogiSetu designs, develops and operates multimodal logistics parks, freight terminals and trade infrastructure across India — connecting global capital with local execution.
          </motion.p>

          <motion.div 
            className="hero-sec__meta-tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="hero-sec__tag">Headquartered in Dubai, UAE</span>
            <span className="hero-sec__tag">Investor Network: UAE & UK</span>
          </motion.div>

          <motion.div 
            className="hero-sec__actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/solutions" className="btn btn-primary">Our Solutions</Link>
            <Link to="/contact" className="btn btn-outline">Partner With Us</Link>
          </motion.div>

          {/* Highlights Grid */}
          <div className="hero-sec__highlights">
            <div className="highlight-card glass-card">
              <h3 className="highlight-card__title">Pan-India Focus</h3>
              <p className="highlight-card__desc">
                Infrastructure development targeted across India's key logistics and trade corridors.
              </p>
            </div>
            
            <div className="highlight-card glass-card">
              <h3 className="highlight-card__title">UAE • UK Capital</h3>
              <p className="highlight-card__desc">
                Backed by a growing network of international and NRI investors across the Gulf and United Kingdom.
              </p>
            </div>
            
            <div className="highlight-card glass-card">
              <h3 className="highlight-card__title">End-to-End Delivery</h3>
              <p className="highlight-card__desc">
                From site selection and design through construction, leasing and operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GAP STATEMENT SECTION (Light theme) */}
      <section className="gap-sec section-light">
        <div className="container gap-sec__inner">
          <div className="gap-sec__icon-wrapper">
            <svg className="gap-sec__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="currentColor"/>
            </svg>
          </div>
          <p className="gap-sec__text">
            LogiSetu exists to close India's logistics infrastructure gap — building the modern warehousing, freight terminals, cold chain and trade facilitation capacity that a fast-growing economy needs to move at the speed of its ambition.
          </p>
        </div>
      </section>

      {/* 3. THE INDIA OPPORTUNITY SECTION (Light theme) */}
      <section className="opportunity-sec section-light">
        <div className="container grid-2 opportunity-sec__inner">
          <div className="opportunity-sec__content">
            <span className="section-label">The India Opportunity</span>
            <h2 className="section-title">A market built for scale</h2>
            <p className="opportunity-sec__desc">
              India's logistics sector is shifting from fragmented, unorganised movement of goods toward modern, technology-enabled infrastructure. Industry estimates place India's logistics market on a path from roughly <strong>$240 billion today to $425 billion-plus by 2030</strong>, driven by manufacturing growth, e-commerce, infrastructure investment and cross-border trade.
            </p>
            <p className="opportunity-sec__desc">
              Much of that growth needs somewhere to happen — modern logistics parks, cold chain networks and multimodal terminals built for scale. That is where LogiSetu is positioned.
            </p>
            
            <ul className="opportunity-sec__checklist">
              <li>
                <span className="checklist-icon">✓</span>
                Manufacturing & industrial expansion
              </li>
              <li>
                <span className="checklist-icon">✓</span>
                E-commerce & cold chain demand
              </li>
              <li>
                <span className="checklist-icon">✓</span>
                Cross-border & regional trade corridors
              </li>
              <li>
                <span className="checklist-icon">✓</span>
                National logistics & infrastructure policy tailwinds
              </li>
            </ul>
          </div>
          
          <div className="opportunity-sec__visual">
            <svg viewBox="0 0 400 320" className="node-diagram">
              <line x1="200" y1="160" x2="80" y2="80" stroke="rgba(229, 131, 36, 0.4)" strokeWidth="1.5" className="pulse-line" />
              <line x1="200" y1="160" x2="320" y2="80" stroke="rgba(229, 131, 36, 0.4)" strokeWidth="1.5" className="pulse-line" />
              <line x1="200" y1="160" x2="80" y2="240" stroke="rgba(229, 131, 36, 0.4)" strokeWidth="1.5" className="pulse-line" />
              <line x1="200" y1="160" x2="320" y2="240" stroke="rgba(229, 131, 36, 0.4)" strokeWidth="1.5" className="pulse-line" />
              
              <g className="node-group">
                <circle cx="80" cy="80" r="8" fill="#E58324" />
                <circle cx="80" cy="80" r="16" fill="none" stroke="#E58324" strokeWidth="1.5" className="node-ring" />
                <text x="70" y="55" className="node-text node-text--right">Manufacturing</text>
                <text x="70" y="65" className="node-sub">Industrial Hubs</text>
              </g>

              <g className="node-group">
                <circle cx="320" cy="80" r="8" fill="#E58324" />
                <circle cx="320" cy="80" r="16" fill="none" stroke="#E58324" strokeWidth="1.5" className="node-ring" />
                <text x="330" y="55" className="node-text">E-Commerce</text>
                <text x="330" y="65" className="node-sub">Fulfillment Demand</text>
              </g>

              <g className="node-group node-group--center">
                <circle cx="200" cy="160" r="14" fill="#1A2F5C" stroke="#E58324" strokeWidth="2.5" />
                <circle cx="200" cy="160" r="26" fill="none" stroke="rgba(229, 131, 36, 0.6)" strokeWidth="1" className="node-ring-center" />
                <text x="200" y="125" className="node-text node-text--center">India-Wide</text>
                <text x="200" y="137" className="node-sub node-sub--center">Logistics Infrastructure Focus</text>
              </g>

              <g className="node-group">
                <circle cx="80" cy="240" r="8" fill="#E58324" />
                <circle cx="80" cy="240" r="16" fill="none" stroke="#E58324" strokeWidth="1.5" className="node-ring" />
                <text x="70" y="215" className="node-text node-text--right">Agri & Cold Chain</text>
                <text x="70" y="225" className="node-sub">Farm to Market</text>
              </g>

              <g className="node-group">
                <circle cx="320" cy="240" r="8" fill="#E58324" />
                <circle cx="320" cy="240" r="16" fill="none" stroke="#E58324" strokeWidth="1.5" className="node-ring" />
                <text x="330" y="215" className="node-text">Cross-Border</text>
                <text x="330" y="225" className="node-sub">Trade Corridors</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DO SECTION (Light theme, white cards) */}
      <section className="what-we-do-sec section-light">
        <div className="container">
          <div className="text-center-wrapper">
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Infrastructure for every link in the chain</h2>
            <p className="section-subtitle">
              LogiSetu builds the physical and digital infrastructure that modern supply chains run on.
            </p>
          </div>

          <div className="grid-3 what-we-do-sec__grid">
            <div className="do-card card-light">
              <div className="do-card__icon-box">
                <svg className="do-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4H5C3.9 4 3 4.9 3 6V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V6C21 4.9 20.1 4 19 4ZM19 18H5V8H19V18Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="do-card__title">Grade A Warehousing & Logistics Parks</h3>
              <p className="do-card__desc">
                Modern, scalable storage and distribution infrastructure built to institutional standards.
              </p>
            </div>

            <div className="do-card card-light">
              <div className="do-card__icon-box">
                <svg className="do-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 19V21H22V19H20V12H16V19H8V8H12V6H4V19H2ZM14 10H10V12H14V10ZM14 14H10V16H14V14Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="do-card__title">Multimodal Freight Terminals</h3>
              <p className="do-card__desc">
                Rail, road and container-yard integration for efficient, high-volume freight movement.
              </p>
            </div>

            <div className="do-card card-light">
              <div className="do-card__icon-box">
                <svg className="do-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H17.82L19.41 10.41L18 9L15 12H13V10L16 7L14.59 5.59L13 7.18V6H11V7.18L9.41 5.59L8 7L11 10V12H9L6 9L4.59 10.41L6.18 12H5C3.9 12 3 12.9 3 14V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V14C21 12.9 20.1 12 19 12Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="do-card__title">Cold Chain & Agri-Logistics</h3>
              <p className="do-card__desc">
                Temperature-controlled infrastructure connecting agriculture and pharma to market faster.
              </p>
            </div>

            <div className="do-card card-light">
              <div className="do-card__icon-box">
                <svg className="do-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V6H20V18ZM10 12L8 9L5 13H19L14 7L10 12Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="do-card__title">E-Commerce Fulfillment Infrastructure</h3>
              <p className="do-card__desc">
                Purpose-built facilities for last-mile and express delivery operators.
              </p>
            </div>

            <div className="do-card card-light">
              <div className="do-card__icon-box">
                <svg className="do-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="do-card__title">Customs & Cross-Border Trade</h3>
              <p className="do-card__desc">
                On-site clearance capability that shortens the distance between production and export.
              </p>
            </div>

            <div className="do-card card-light">
              <div className="do-card__icon-box">
                <svg className="do-card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 18C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H0V20H24V18H20ZM4 4H20V14H4V4Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="do-card__title">Logistics Technology & Supply Chain</h3>
              <p className="do-card__desc">
                Software and data infrastructure that make physical logistics assets visible and efficient.
              </p>
            </div>
          </div>

          <div className="text-center-wrapper" style={{ marginTop: '5rem' }}>
            <Link to="/solutions" className="btn btn-primary">Explore All Solutions</Link>
          </div>
        </div>
      </section>

      {/* 5. WHY LOGISETU SECTION (Light theme, white cards) */}
      <section className="why-sec section-light">
        <div className="container">
          <div className="text-center-wrapper">
            <span className="section-label">Why LogiSetu</span>
            <h2 className="section-title">Global capital, built for local execution</h2>
          </div>

          <div className="grid-4 why-sec__grid">
            <div className="why-card card-light">
              <div className="why-card__num">01</div>
              <h3 className="why-card__title">Global Capital, Local Execution</h3>
              <p className="why-card__desc">
                An international investor base across the UAE and UK, paired with on-ground execution teams in target Indian states.
              </p>
            </div>

            <div className="why-card card-light">
              <div className="why-card__num">02</div>
              <h3 className="why-card__title">Infrastructure-First</h3>
              <p className="why-card__desc">
                We build the physical and digital backbone first — land, warehousing, terminals, and trade facilitation hubs.
              </p>
            </div>

            <div className="why-card card-light">
              <div className="why-card__num">03</div>
              <h3 className="why-card__title">Cross-Border Expertise</h3>
              <p className="why-card__desc">
                Deep understanding of trade agreements, custom clearance protocols, and logistics networks connecting India and global hubs.
              </p>
            </div>

            <div className="why-card card-light">
              <div className="why-card__num">04</div>
              <h3 className="why-card__title">Long-Term Capital</h3>
              <p className="why-card__desc">
                Patient, institutional capital that matches the lifecycle of national-scale logistics assets and long-term lease terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR NETWORK SECTION (Dark theme) */}
      <section className="network-sec section-dark">
        <div className="container grid-2 network-sec__inner">
          <div className="network-sec__content">
            <span className="section-label">Our Network</span>
            <h2 className="section-title">A global network, built for India</h2>
            <p className="network-sec__desc">
              LogiSetu is headquartered in Dubai and supported by a network of strategic and NRI investors across the UAE and United Kingdom — capital and relationships aligned with one goal: building India's logistics infrastructure for the next decade.
            </p>
            <div style={{ marginTop: '3rem' }}>
              <Link to="/network" className="btn btn-outline">Explore Our Network</Link>
            </div>
          </div>
          
          <div className="network-sec__visual">
            <svg viewBox="0 0 500 280" className="network-map">
              <path d="M 120 220 Q 250 140, 310 130" fill="none" stroke="url(#arcGrad)" strokeWidth="2.5" className="glow-arc" />
              <path d="M 310 130 Q 380 90, 420 80" fill="none" stroke="url(#arcGrad)" strokeWidth="2" className="glow-arc" />
              <path d="M 120 220 Q 270 120, 420 80" fill="none" stroke="rgba(229, 131, 36, 0.3)" strokeWidth="1.5" strokeDasharray="5,5" />

              <defs>
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DF8F36" />
                  <stop offset="100%" stopColor="#1A2F5C" />
                </linearGradient>
              </defs>

              <g className="city-group">
                <circle cx="420" cy="80" r="7" fill="#E58324" />
                <circle cx="420" cy="80" r="14" fill="none" stroke="#E58324" strokeWidth="1" className="city-pulse" />
                <text x="420" y="60" className="city-name" textAnchor="middle">London</text>
                <text x="420" y="70" className="city-sub" textAnchor="middle">Investor & NRI</text>
              </g>

              <g className="city-group">
                <circle cx="310" cy="130" r="7" fill="#E58324" />
                <circle cx="310" cy="130" r="14" fill="none" stroke="#E58324" strokeWidth="1" className="city-pulse" />
                <text x="325" y="130" className="city-name text-start">Dubai</text>
                <text x="325" y="140" className="city-sub text-start">Global Headquarters</text>
              </g>

              <g className="city-group">
                <circle cx="120" cy="220" r="9" fill="#1A2F5C" stroke="#E58324" strokeWidth="2" />
                <circle cx="120" cy="220" r="18" fill="none" stroke="rgba(229, 131, 36, 0.6)" strokeWidth="1.5" className="city-pulse" />
                <text x="120" y="243" className="city-name" textAnchor="middle">India</text>
                <text x="120" y="253" className="city-sub" textAnchor="middle">On-ground Execution</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* 7. PARTNER WITH US SECTION (Gold banner exactly like screenshots) */}
      <section className="partner-sec">
        <div className="container partner-sec__inner">
          <span className="section-label" style={{ color: '#050B18' }}>Partner With Us</span>
          <h2 className="partner-sec__title">Let's build India's logistics infrastructure, together</h2>
          <p className="partner-sec__subtitle">
            Whether you are an investor, a state agency, or a business looking for logistics infrastructure partners — we'd like to hear from you.
          </p>
          <div style={{ marginTop: '2.5rem' }}>
            <Link to="/contact" className="btn btn-primary" style={{ background: '#050B18', color: '#FFFFFF', border: '1px solid #050B18' }}>Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
