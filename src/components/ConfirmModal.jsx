
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
  animation: 'fadeIn 0.3s ease-in-out',
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '15px',
  maxWidth: '500px',
  width: '90%',
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  animation: 'scaleIn 0.3s ease-in-out',
};

const buttonStyle = {
  padding: '10px 16px',
  fontSize: '1rem',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
};

const cancelBtnStyle = {
  ...buttonStyle,
  backgroundColor: '#f0f0f0',
  color: '#333',
  marginRight: '10px',
};

const submitBtnStyle = {
  ...buttonStyle,
  backgroundColor: 'green',
  color: '#fff',
};

// Inject animation keyframes (only once)
if (typeof document !== 'undefined') {
  const styleSheet = document.styleSheets[0];
  if (styleSheet) {
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
}

const formatKey = (key) => {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
};

const ConfirmModal = ({ show, onCancel, onConfirm, data }) => {
  if (!show) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h3 style={{ marginBottom: '20px' }}>
          Confirm {data?.action ? formatKey(data.action) : 'Submission'}
        </h3>

        <ul style={{ listStyle: 'none', paddingLeft: 0, wordBreak: 'break-word' }}>
          {Object.entries(data).map(([key, value]) => (
            key !== 'action' && (
              <li key={key} style={{ marginBottom: '12px' }}>
                <strong>{formatKey(key)}:</strong>{' '}
                {key.toLowerCase() === 'link' ? (
                  <a href={value} target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF' }}>
                    {value}
                  </a>
                ) : (
                  value
                )}
              </li>
            )
          ))}
        </ul>

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button onClick={onCancel} style={cancelBtnStyle}>Cancel</button>
          <button onClick={onConfirm} style={submitBtnStyle}>Yes, Submit</button>
          {/* <button onClick={() => {
            console.log("Confirm button clicked");
            onConfirm();
          }} style={submitBtnStyle}>Submit</button> */}

        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
