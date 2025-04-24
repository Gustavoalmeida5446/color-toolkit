import chroma from 'chroma-js';

export function toPercent(value: number) {
    return (value * 100).toFixed(2);
}

export const cmykArray = (color: string): string[] => {
    return chroma(color).cmyk().map(toPercent)
};

export const hslArray = (color: string): string[] => {
    return chroma(color).hsl().map(el => (el * 100).toFixed(2)).slice(0, 3)
};

export const hslObject =  (hslArray: string) => {
    return {
    hue: isNaN(parseFloat(hslArray[0])) ? 0 : (parseFloat(hslArray[0]) / 100).toFixed(2),
    saturation: hslArray[1],
    lightness: hslArray[2],
}
}

export const hslString =  (hslObject) => {
    `(${hslObject.hue}, ${hslObject.saturation}%, ${hslObject.lightness}%)`;
};

export const rgb = (color: string) => {
chroma(color).rgb();
}
