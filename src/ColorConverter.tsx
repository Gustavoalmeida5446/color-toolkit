import './css/index.css'
import { FaRegCopy } from "react-icons/fa";
import chroma from "chroma-js";
import React, { useEffect, useState } from "react";
import theme from './theme';
import Footer from './components/Footer';
import { copyToClipboard } from "./utils";
import InputSection from './components/InputSection';

function ColorConverter() {

    const [color, setColor] = useState(chroma.random().hex());
    const [inputValue, setInputValue] = useState(color);

    function toPercent(value: number) {
        const roundedNumber = (value * 100).toFixed(2);
        return roundedNumber;
    }

    const cmykArray = chroma(color).cmyk().map(toPercent);

    const hslArray = chroma(color).hsl().map(el => (el * 100).toFixed(2)).slice(0, 3);
    const hslObject = {
        hue: isNaN(parseFloat(hslArray[0])) ? 0 : (parseFloat(hslArray[0]) / 100).toFixed(2),
        saturation: hslArray[1],
        lightness: hslArray[2],
    }
    const hslString = `(${hslObject.hue}, ${hslObject.saturation}%, ${hslObject.lightness}%)`;

    const rgb = chroma(color).rgb();


    const handleClick = () => {
        const colorInput = inputValue.trim().toUpperCase().replace('#', '').replace(/[^0-9A-F]/g, "").slice(0, 6);

        if (chroma.valid(colorInput)) {
            setColor(`#${colorInput}`);
        } else {
            alert('Invalid color format. Please enter a valid hex code. e.g. #FF5733');
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const key = e.key.toUpperCase();
        if (key === 'ENTER') {
            handleClick();
        }
    }

    const handleRandomColor = () => {
        const randomColor = chroma.random().hex();
        setColor(randomColor);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.toUpperCase().replace(/[^#0-9A-F]/g, '');
        setInputValue(input);
    }

    useEffect(() => {
        setInputValue(color);
    }, [color]);

    useEffect(() => {
        const container = document.querySelector('.container-converter') as HTMLDivElement;
        if (chroma.valid(color)) {
            container.style.backgroundColor = color;
        }
    }, [color]);

    const handleCopy = (text: string) => {
        copyToClipboard(text);
        alert('Copied to clipboard: ' + text);
    }

    return (
        <>
            <div className="container-home">
                <h1>Color Converter</h1>
                <p>Enter a hex code below to convert it to CMYK, HSL, and RGB.</p>
                <InputSection
                    inputValue={inputValue}
                    onChange={handleInputChange}
                    onConvert={handleClick}
                    onRandom={handleRandomColor}
                    onKeyDown={handleKeyDown}
                />

            </div>

            <div className="container-color-converter">
                <div className="container-converter">

                    <div className="box-converter">
                        <h2>CMYK</h2>
                        <div style={{ textAlign: 'left' }}>
                            <p>cmyk: ({cmykArray.join(', ')})
                                <FaRegCopy color={theme.gray}
                                    onClick={() => handleCopy(`cmyk: (${cmykArray.join(', ')})`)}
                                /></p>
                            <p>cian: {cmykArray[0]}%</p>
                            <p>magenta: {cmykArray[1]}%</p>
                            <p>yellow: {cmykArray[2]}%</p>
                            <p>black (key): {cmykArray[3]}%</p>
                        </div>
                    </div>

                    <div className="box-converter">
                        <h2>HSL</h2>
                        <div style={{ textAlign: 'left' }}>
                            <p>hsl: {hslString}
                                <FaRegCopy color={theme.gray}
                                    onClick={() => handleCopy(`hsl: ${hslString}`)}
                                />
                            </p>
                            <p>hue: {hslObject.hue}º</p>
                            <p>saturation: {hslObject.saturation}%</p>
                            <p>lightness: {hslObject.lightness}%</p>
                        </div>
                    </div>

                    <div className="box-converter">
                        <h2>RGB</h2>
                        <div style={{ textAlign: 'left' }}>
                            <p>rgb: ({rgb.join(', ')})
                                <FaRegCopy color={theme.gray}
                                    onClick={() => handleCopy(`rgb: (${rgb.join(', ')})`)}
                                />
                            </p>
                            <p>red: {rgb[0]}</p>
                            <p>green: {rgb[1]}</p>
                            <p>blue: {rgb[2]}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ColorConverter;