import React from 'react';

const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  animation: 'fadeIn 0.3s ease-in-out'
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '15px',
  maxWidth: '500px',
  width: '90%',
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  animation: 'scaleIn 0.3s ease-in-out'
};

// Inject animation keyframes (runs once)
if (typeof document !== 'undefined') {
  const styleSheet = document.styleSheets[0];
  const fadeIn = `
    @keyframes fadeIn {
      from { opacity: 0 }
      to { opacity: 1 }
    }
  `;
  const scaleIn = `
    @keyframes scaleIn {
      from { transform: scale(0.9); opacity: 0 }
      to { transform: scale(1); opacity: 1 }
    }
  `;
  styleSheet.insertRule(fadeIn, styleSheet.cssRules.length);
  styleSheet.insertRule(scaleIn, styleSheet.cssRules.length);
}

const ConfirmModal = ({ show, onCancel, onConfirm, data }) => {
  if (!show) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        {/* <h3 style={{ marginBottom: '20px' }}>Confirm Your Data</h3> */}
        <h3>Confirm {data?.action || 'Submission'}</h3>

        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {Object.entries(data).map(([key, value]) => (
            <li key={key} style={{ marginBottom: '8px' }}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button onClick={onCancel} style={{ marginRight: '10px' }}>Cancel</button>
          <button onClick={onConfirm} style={{ backgroundColor: 'green', color: 'white' }}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
