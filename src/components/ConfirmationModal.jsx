import React from 'react';

export function ConfirmationModal({ config, onClose }) {
    if (!config || !config.isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose} role="presentation">
            <div 
                className="modal-dialog" 
                onClick={e => e.stopPropagation()} 
                role="dialog" 
                aria-modal="true" 
                aria-labelledby="modal-title"
            >
                <div className="modal-header">
                    <span className="modal-icon">{config.icon || '⚠️'}</span>
                    <h2 className="modal-title" id="modal-title">{config.title}</h2>
                </div>
                <div className="modal-body">
                    <p>{config.message}</p>
                    {config.details && (
                        <div className="modal-order-summary">
                            {config.details}
                        </div>
                    )}
                </div>
                <div className="modal-actions">
                    <button className="modal-btn modal-btn-cancel" onClick={onClose}>
                        {config.cancelText || 'Batal'}
                    </button>
                    <button 
                        className={`modal-btn modal-btn-confirm ${config.confirmVariant || 'primary'}`}
                        onClick={() => {
                            config.onConfirm();
                            onClose();
                        }}
                    >
                        {config.confirmText || 'Konfirmasi'}
                    </button>
                </div>
            </div>
        </div>
    );
}
