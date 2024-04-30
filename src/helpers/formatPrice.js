export const formatPrice = (price) => Number(price).toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});