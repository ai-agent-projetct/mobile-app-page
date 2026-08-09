import React from 'react';
import { Shield, ShieldAlert, Check, X, Save } from 'lucide-react';

export default function RolesPermissions({ 
  rolePermissions, 
  setRolePermissions, 
  addAuditLog, 
  currentRole 
}) {
  const pagesList = [
    { key: 'dashboard', label: 'Dashboard & Simulators' },
    { key: 'doctors', label: 'Doctor Profiles Management' },
    { key: 'patients', label: 'Patient CRM & Profiles' },
    { key: 'departments', label: 'Departments Management' },
    { key: 'appointments', label: 'Appointments Booking' },
    { key: 'ivr', label: 'IVR Center & Recordings' },
    { key: 'online', label: 'Online Consultations Monitor' },
    { key: 'scribe', label: 'AI Scribe SOAP Assistant' },
    { key: 'payments', label: 'Payments & Billing' },
    { key: 'revenue', label: 'Revenue Dashboard & Reports' },
    { key: 'staff', label: 'Staff Provisioning' },
    { key: 'roles', label: 'Roles & Permissions Matrix' },
    { key: 'notifications', label: 'Notifications Templates' },
    { key: 'settings', label: 'Hospital Settings Config' },
    { key: 'health', label: 'Technical System Health' },
    { key: 'audit', label: 'Audit Logs Viewer' }
  ];

  const rolesList = ['Super Admin', 'Hospital Admin', 'Doctor', 'Receptionist', 'Billing Staff'];

  const handleTogglePermission = (role, pageKey) => {
    if (currentRole !== 'Super Admin') {
      alert("Permission Denied: Only a Super Admin is authorized to adjust role access permissions.");
      return;
    }
    if (role === 'Super Admin') {
      alert("System Rule: Super Admin access permissions are locked and cannot be disabled.");
      return;
    }

    setRolePermissions(prev => {
      const currentSet = new Set(prev[role] || []);
      if (currentSet.has(pageKey)) {
        currentSet.delete(pageKey);
      } else {
        currentSet.add(pageKey);
      }
      
      addAuditLog(currentRole, "Modified Role Permissions", "Security & Roles", `Toggled access for ${role} on ${pageKey}`);
      return {
        ...prev,
        [role]: Array.from(currentSet)
      };
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>Security Roles & Permissions Matrix</h2>
          <p>Configure Role-Based Access Controls (RBAC) to enforce security isolation across medical, billing, and admin logs.</p>
        </div>
      </div>

      {currentRole !== 'Super Admin' && (
        <div className="card" style={{ border: '1px solid var(--danger)', backgroundColor: 'var(--danger-bg)', marginBottom: '24px', padding: '16px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <ShieldAlert size={20} style={{ color: 'var(--danger)' }} />
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--danger)' }}>
              Viewing Mode Only: You are currently logged in as <strong>{currentRole}</strong>. 
              Only a <strong>Super Admin</strong> can change these checkboxes. Use the switcher at the top right to change roles.
            </span>
          </div>
        </div>
      )}

      {/* Permissions Matrix */}
      <div className="card">
        <div className="card-header">
          <h3>RBAC Matrix</h3>
        </div>

        <div className="table-container">
          <table className="table-list" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ minWidth: '220px' }}>Module / Navigation Link</th>
                {rolesList.map((role, idx) => (
                  <th key={idx} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <Shield size={14} style={{ color: 'var(--primary)' }} />
                      <span>{role}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagesList.map((page, idx) => (
                <tr key={idx}>
                  <td><strong>{page.label}</strong></td>
                  {rolesList.map((role, rIdx) => {
                    const isAllowed = rolePermissions[role]?.includes(page.key);
                    return (
                      <td key={rIdx} style={{ textAlign: 'center' }}>
                        <input 
                          type="checkbox"
                          style={{ width: '18px', height: '18px', cursor: currentRole === 'Super Admin' && role !== 'Super Admin' ? 'pointer' : 'not-allowed' }}
                          checked={isAllowed || false}
                          disabled={currentRole !== 'Super Admin' || role === 'Super Admin'}
                          onChange={() => handleTogglePermission(role, page.key)}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
