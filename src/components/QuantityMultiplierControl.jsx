import React, { useState, useEffect } from 'react';

export function QuantityMultiplierControl({ item, onUpdateQuantity, onPromptRemove }) {
    const step = item.product.stepMultiplier || 1;
    const [localValue, setLocalValue] = useState(item.quantity.toString());

    // Synchronize local input state whenever item.quantity changes from outside
    useEffect(() => {
        setLocalValue(item.quantity.toString());
    }, [item.quantity]);

    const handleDecrement = () => {
        if (item.quantity <= step) {
            onPromptRemove(item.product);
        } else {
            const nextVal = item.quantity - step;
            setLocalValue(nextVal.toString());
            onUpdateQuantity(item.product.id, nextVal);
        }
    };

    const handleIncrement = () => {
        const nextVal = Math.min(999, item.quantity + step);
        setLocalValue(nextVal.toString());
        onUpdateQuantity(item.product.id, nextVal);
    };

    // Allows user to backspace and type smoothly without jumping
    const handleInputChange = (e) => {
        const valStr = e.target.value;
        setLocalValue(valStr);

        const parsed = parseInt(valStr, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 999) {
            onUpdateQuantity(item.product.id, parsed);
        }
    };

    // On blur: clamp strictly between 1 and 999
    const handleInputBlur = () => {
        const parsed = parseInt(localValue, 10);
        if (isNaN(parsed) || parsed < 1) {
            setLocalValue('1');
            onUpdateQuantity(item.product.id, 1);
        } else if (parsed > 999) {
            setLocalValue('999');
            onUpdateQuantity(item.product.id, 999);
        } else {
            setLocalValue(parsed.toString());
            onUpdateQuantity(item.product.id, parsed);
        }
    };

    const handleAddMultiple = (multiplier) => {
        const nextVal = Math.min(999, item.quantity + multiplier);
        setLocalValue(nextVal.toString());
        onUpdateQuantity(item.product.id, nextVal);
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
                    value={localValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
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
