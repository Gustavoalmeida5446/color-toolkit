import chroma from "chroma-js";

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
  });
};

export const toPercent = (value: number): string => {
  return (value * 100).toFixed(2);
};

export const getCMYK = (color: string): string[] => {
  return chroma(color).cmyk().map(toPercent);
};

export const getHSL = (color: string): {
  hslString: string;
  hslObject: {
    hue: string;
    saturation: string;
    lightness: string;
  };
} => {
  const hslArray = chroma(color).hsl().map(el => (el * 100).toFixed(2)).slice(0, 3);
  const hue = isNaN(parseFloat(hslArray[0])) ? "0.00" : (parseFloat(hslArray[0]) / 100).toFixed(2);

  const hslObject = {
    hue,
    saturation: hslArray[1],
    lightness: hslArray[2],
  };

  const hslString = `(${hslObject.hue}, ${hslObject.saturation}%, ${hslObject.lightness}%)`;

  return { hslString, hslObject };
};

export const getRGB = (color: string): number[] => {
  return chroma(color).rgb();
};
