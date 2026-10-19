import React, { useRef, useEffect } from 'react';

export function ConfirmationModal({ config, onClose }) {
    const confirmBtnRef = useRef(null);
    const cancelBtnRef = useRef(null);
    const dialogRef = useRef(null);

    // Accessibility: Auto-focus confirm button on open & setup Focus Trap
    useEffect(() => {
        if (!config?.isOpen) return;

        confirmBtnRef.current?.focus();

        const handleKeyDown = (e) => {
            if (e.key !== 'Tab') return;

            const focusableElements = [cancelBtnRef.current, confirmBtnRef.current].filter(Boolean);
            if (focusableElements.length < 2) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                // Shift + Tab: moving backwards
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab: moving forwards
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [config?.isOpen]);

    if (!config || !config.isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose} role="presentation">
            <div 
                ref={dialogRef}
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
                    <button 
                        ref={cancelBtnRef}
                        className="modal-btn modal-btn-cancel" 
                        onClick={onClose}
                    >
                        {config.cancelText || 'Batal'}
                    </button>
                    <button 
                        ref={confirmBtnRef}
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
