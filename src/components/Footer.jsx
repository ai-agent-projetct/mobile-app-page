import { Link } from 'react-router-dom'
import Logo from './Logo'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo height={42} className="footer__logo-img" />
            <p className="footer__description">
              Logistics infrastructure for India, backed by a global capital and investor network across the UAE and UK.
            </p>
          </div>

          <div className="footer__nav">
            <h4 className="footer__nav-title text-label">Company</h4>
            <ul className="footer__nav-list">
              <li><Link to="/about" className="footer__nav-link">About</Link></li>
              <li><Link to="/solutions" className="footer__nav-link">Solutions</Link></li>
              <li><Link to="/insights" className="footer__nav-link">Insights</Link></li>
            </ul>
          </div>

          <div className="footer__nav">
            <h4 className="footer__nav-title text-label">Global</h4>
            <ul className="footer__nav-list">
              <li><Link to="/network" className="footer__nav-link">Network & Investment</Link></li>
              <li><Link to="/contact" className="footer__nav-link">Contact</Link></li>
              <li><Link to="/network#investors" className="footer__nav-link">Investor Relations</Link></li>
            </ul>
          </div>

          <div className="footer__contact">
            <h4 className="footer__nav-title text-label">Head Office</h4>
            <address className="footer__address">
              <p>Dubai, United Arab Emirates</p>
              <p className="footer__meta-info">Global Capital Anchor</p>
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} LogiSetu. All rights reserved.
          </p>
          <div className="footer__sub-links">
            <span>Logistics Infrastructure</span>
            <span className="footer__dot">•</span>
            <span>Dubai</span>
            <span className="footer__dot">•</span>
            <span>London</span>
            <span className="footer__dot">•</span>
            <span>India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
