import { useState, useCallback } from 'react';

/**
 * Custom Hook: useModal
 * Mengelola siklus hidup, status visibilitas, konfigurasi konten, dan callback aksi modal dialog.
 */
export function useModal() {
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        icon: '⚠️',
        details: null,
        confirmText: 'Konfirmasi',
        cancelText: 'Batal',
        confirmVariant: 'primary',
        onConfirm: () => {}
    });

    const openModal = useCallback((config) => {
        setModalConfig({
            isOpen: true,
            title: config.title || 'Konfirmasi',
            message: config.message || '',
            icon: config.icon || '⚠️',
            details: config.details || null,
            confirmText: config.confirmText || 'Konfirmasi',
            cancelText: config.cancelText || 'Batal',
            confirmVariant: config.confirmVariant || 'primary',
            onConfirm: config.onConfirm || (() => {})
        });
    }, []);

    const closeModal = useCallback(() => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    }, []);

    return {
        modalConfig,
        openModal,
        closeModal
    };
}
