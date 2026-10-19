/**
 * Centralized formatting utilities
 */
export function formatCurrency(amount) {
    const val = Number(amount) || 0;
    return `NT$ ${val.toLocaleString('zh-TW')}`;
}
