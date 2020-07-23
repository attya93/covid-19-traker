import numeral from 'numeral';

export const prettyPrintStary = (start) => {
    return start ? `+${numeral(start).format('0.0a')} ` : "+0 ";
} 