import React from 'react';
import { QuantityMultiplierControl } from './QuantityMultiplierControl';

export function CartItem({ item, onUpdateQuantity, onPromptRemove }) {
    return (
        <div className="cart-item">
            <div className="cart-item__image">{item.product.emoji}</div>
            <div className="cart-item__content">
                <div className="cart-item__header-row">
                    <h3 className="cart-item__title">{item.product.name}</h3>
                    <button 
                        className="cart-item__remove-btn" 
                        onClick={() => onPromptRemove(item.product)}
                        title="Hapus item"
                        aria-label={`Hapus ${item.product.name}`}
                    >
                        🗑️
                    </button>
                </div>
                <div className="cart-item__price">
                    NT$ {(item.product.price * item.quantity).toLocaleString()}
                    <span style={{ fontSize: '11px', color: 'var(--color-gray-600)', fontWeight: 'normal', marginLeft: '6px' }}>
                        (@ NT$ {item.product.price.toLocaleString()})
                    </span>
                </div>
                <QuantityMultiplierControl 
                    item={item} 
                    onUpdateQuantity={onUpdateQuantity}
                    onPromptRemove={onPromptRemove}
                />
            </div>
        </div>
    );
}
