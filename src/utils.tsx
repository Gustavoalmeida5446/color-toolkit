import chroma from "chroma-js";
import './css/style.css';

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
  });

  const copyToast = document.createElement("div");
  copyToast.textContent = text + " copied";
  copyToast.classList.add("copy-toast"); 
  document.body.appendChild(copyToast);

  setTimeout(() => {
    copyToast.remove();
  }, 1000);
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

export const getTintsArray = (color: string): string[] => {
  const tints = [];
  for (let i = 0; i < 10; i++) {
    tints.push(chroma.scale([color, 'ffffff'])(i / 10).hex());
  }
  return tints;
} 
export const getShadesArray = (color: string): string[] => {
  const tints = [];
  for (let i = 0; i < 10; i++) {
    tints.push(chroma.scale([color, '000000'])(i / 10).hex());
  }
  return tints;
} 
