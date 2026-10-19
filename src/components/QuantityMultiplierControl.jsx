import React from 'react';

export function QuantityMultiplierControl({ item, onUpdateQuantity, onPromptRemove }) {
    const step = item.product.stepMultiplier || 1;

    const handleDecrement = () => {
        if (item.quantity <= step) {
            onPromptRemove(item.product);
        } else {
            onUpdateQuantity(item.product.id, item.quantity - step);
        }
    };

    const handleIncrement = () => {
        onUpdateQuantity(item.product.id, item.quantity + step);
    };

    const handleDirectInput = (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val > 0) {
            onUpdateQuantity(item.product.id, val);
        }
    };

    const handleAddMultiple = (multiplier) => {
        onUpdateQuantity(item.product.id, item.quantity + multiplier);
    };

    return (
        <div className="qty-control-wrapper">
            <div className="qty-stepper">
                <button 
                    className="qty-stepper__btn" 
                    onClick={handleDecrement}
                    title={item.quantity <= step ? "Hapus produk" : `Kurangi ${step}`}
                    aria-label="Kurangi kuantitas"
                >
                    -
                </button>
                <input
                    type="number"
                    className="qty-stepper__input"
                    value={item.quantity}
                    onChange={handleDirectInput}
                    min="1"
                    max="999"
                    aria-label={`Kuantitas ${item.product.name}`}
                />
                <button 
                    className="qty-stepper__btn" 
                    onClick={handleIncrement}
                    title={`Tambah ${step}`}
                    aria-label="Tambah kuantitas"
                >
                    +
                </button>
            </div>
            
            {/* Multiplier Preset Badges (+5, +10) */}
            <div className="qty-multipliers">
                <span style={{ fontSize: '11px', color: 'var(--color-gray-600)' }}>Batch:</span>
                <button 
                    className="qty-multiplier-badge" 
                    onClick={() => handleAddMultiple(5)}
                    title="Tambah 5 unit sekaligus"
                >
                    +5
                </button>
                <button 
                    className="qty-multiplier-badge" 
                    onClick={() => handleAddMultiple(10)}
                    title="Tambah 10 unit sekaligus"
                >
                    +10
                </button>
            </div>
        </div>
    );
}
