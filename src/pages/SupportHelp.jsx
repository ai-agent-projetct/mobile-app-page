import React, { useState } from 'react';
import { Search, MessageSquare, Phone, Mail, ChevronDown, ChevronUp, HelpCircle, ExternalLink, CheckCircle, Clock } from 'lucide-react';

export default function SupportHelp({ 
  addAuditLog, 
  currentRole 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { id: 1, q: "How to reset digital signature?", a: "Go to Clinical Preferences > Digital Signature in your menu. Click Upload Image to upload a new SHA-256 verified signature file." },
    { id: 2, q: "Connecting to lab results", a: "Lab results connect via HL7 FHIR integration APIs. If your clinic's EMR integration is disconnected, submit a ticket to the tech desk." },
    { id: 3, q: "Understanding billing cycles", a: "Payout batches are processed every 24 hours at 11:30 AM subject to the daily bank transfer limit of ₹50,000 per batch." },
    { id: 4, q: "Mobile app data syncing", a: "The doctor and patient mobile apps use real-time WebSockets to sync appointment tokens instantly." }
  ];

  const handleStartChat = () => {
    alert("Connecting to 24/7 Priority Support Chat agent... Estimated wait: 2 mins.");
    addAuditLog(currentRole, "Initiated Support Chat", "Support & Help", "Opened live chat with technical desk");
  };

  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <div className="page-title">
          <h2>Support & Help Center</h2>
          <p>Get instant assistance from technical support, submit lab integration tickets, and browse FAQs.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div className="header-search" style={{ width: '100%' }}>
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search help articles or FAQs..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Quick Assistance Banner Cards */}
      <div style={{ marginBottom: '24px' }}>
        <div className="card" style={{ backgroundColor: '#0f4c5c', color: 'white', marginBottom: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'white' }}>Chat with Support</h3>
                <p style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '2px' }}>Average wait time: 2 mins</p>
              </div>
            </div>
            <button className="btn" style={{ backgroundColor: 'white', color: '#0f4c5c', fontWeight: 'bold' }} onClick={handleStartChat}>
              Start Chat
            </button>
          </div>
        </div>

        <div className="grid-2">
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px' }}>
            <div className="stat-icon primary" style={{ width: '44px', height: '44px' }}><Phone size={20} /></div>
            <div>
              <strong style={{ fontSize: '0.95rem' }}>Call Support</strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>24/7 Priority Line (+91 44 2810 5000)</p>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px' }}>
            <div className="stat-icon info" style={{ width: '44px', height: '44px' }}><Mail size={20} /></div>
            <div>
              <strong style={{ fontSize: '0.95rem' }}>Email Support</strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Reply guaranteed within 24h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Support Tickets */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h3>Active Tickets</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>View All</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="stat-icon info" style={{ width: '36px', height: '36px' }}><Clock size={16} /></div>
              <div>
                <strong style={{ fontSize: '0.9rem' }}>#TK-88201 — Lab Integration Error</strong>
              </div>
            </div>
            <span className="badge badge-warning">● In Progress</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="stat-icon success" style={{ width: '36px', height: '36px' }}><CheckCircle size={16} /></div>
              <div>
                <strong style={{ fontSize: '0.9rem' }}>#TK-87954 — Billing Cycle Update</strong>
              </div>
            </div>
            <span className="badge badge-secondary">Resolved</span>
          </div>
        </div>
      </div>

      {/* Popular Questions Accordions */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h3>Popular Questions</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {faqs.map(faq => (
            <div key={faq.id} style={{ border: '1px solid var(--border-light)', borderRadius: '12px', overflow: 'hidden' }}>
              <button 
                style={{ 
                  width: '100%', 
                  padding: '14px 16px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  background: 'none', 
                  border: 'none', 
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              >
                <span>{faq.q}</span>
                {openFaq === faq.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openFaq === faq.id && (
                <div style={{ padding: '0 16px 14px 16px', fontSize: '0.85rem', color: 'var(--text-medium)', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Banner */}
      <div style={{ textAlignment: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Can't find what you're looking for?</p>
        <button className="btn btn-secondary" onClick={() => alert("Redirecting to online Knowledge Base...")}>
          <ExternalLink size={16} /> Visit Help Center
        </button>
      </div>
    </div>
  );
}
