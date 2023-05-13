export const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export const decimalSep = (num: number) => {
    const integerPart = Math.floor(num);
    const fraction = num - integerPart;
    let roundedFraction
    if (fraction <= 0.25) {
        roundedFraction = 0
    } else if ((fraction > 0.25) && (fraction <= 0.8)) {
        roundedFraction = 0.5
    } else {
        roundedFraction = 1
    }
    return [integerPart, roundedFraction]
}