export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

export const capitalize = (str: string): string => str[0].toUpperCase() + str.slice(1);
