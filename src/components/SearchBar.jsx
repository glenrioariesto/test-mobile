import React, { useRef, useEffect } from 'react';

export function SearchBar({ searchQuery, onSearchChange, onClear, totalResults }) {
    const inputRef = useRef(null);

    // Keyboard shortcut '/' to quickly focus the search bar
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '/' && document.activeElement !== inputRef.current) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleClearAndFocus = () => {
        onClear();
        inputRef.current?.focus();
    };

    return (
        <div className="search-section">
            <div className="search-bar">
                <span className="search-bar__icon">🔍</span>
                <input
                    ref={inputRef}
                    type="search"
                    className="search-bar__input"
                    placeholder="Cari produk (tekan '/' untuk fokus cepat, misal: 'mouse', '無線')..."
                    value={searchQuery}
                    onChange={e => onSearchChange(e.target.value)}
                    aria-label="Cari produk"
                />
                {searchQuery && (
                    <button 
                        className="search-bar__clear" 
                        onClick={handleClearAndFocus} 
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
