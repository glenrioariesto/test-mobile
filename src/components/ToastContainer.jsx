import React from 'react';

export function ToastContainer({ toasts, onDismiss }) {
    if (toasts.length === 0) return null;

    return (
        <div className="toast-container" role="region" aria-label="Notifikasi">
            {toasts.map(toast => (
                <div key={toast.id} className={`toast-item ${toast.type}`}>
                    <div className="toast-content">
                        <span>{toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}</span>
                        <span>{toast.message}</span>
                    </div>
                    <button 
                        className="toast-close" 
                        onClick={() => onDismiss(toast.id)} 
                        aria-label="Tutup notifikasi"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
}
