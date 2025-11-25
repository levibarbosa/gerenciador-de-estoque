/**
 * Formata um valor numérico para moeda brasileira (BRL).
 * @param {number} value - O valor a ser formatado.
 * @returns {string} - O valor formatado (ex: R$ 1.234,56).
 */
export const formatCurrency = (value) => {
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};

/**
 * Formata uma data ISO para o padrão brasileiro.
 * @param {string} dateString - A data em formato ISO.
 * @returns {string} - A data formatada (ex: 25/11/2025 14:30).
 */
export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR');
};
