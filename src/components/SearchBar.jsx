import React from 'react';

export function SearchBar({ searchQuery, onSearchChange, onClear, totalResults }) {
    return (
        <div className="search-section">
            <div className="search-bar">
                <span className="search-bar__icon">🔍</span>
                <input
                    type="search"
                    className="search-bar__input"
                    placeholder="Cari produk impian Anda (misal: 'mouse', '無線', '耳機')..."
                    value={searchQuery}
                    onChange={e => onSearchChange(e.target.value)}
                    aria-label="Cari produk"
                />
                {searchQuery && (
                    <button 
                        className="search-bar__clear" 
                        onClick={onClear} 
                        aria-label="Hapus kata kunci"
                    >
                        ×
                    </button>
                )}
            </div>
            {searchQuery.trim() !== '' && (
                <div className="search-results-info">
                    <span>Menampilkan hasil untuk: <strong>"{searchQuery}"</strong></span>
                    <span>{totalResults} produk ditemukan</span>
                </div>
            )}
        </div>
    );
}
