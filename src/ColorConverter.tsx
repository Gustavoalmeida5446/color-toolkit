import './css/index.css'
import { FaRandom, FaRegCopy } from "react-icons/fa";
import chroma from "chroma-js";
import Divider from "./components/divider";
import React, { useEffect, useState } from "react";
import theme from './theme';

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

        if (key === 'Enter') {
            handleClick();
        }
        if (
            !(key >= '0' && key <= '9') &&
            !(key >= 'A' && key <= 'F') &&
            key !== 'Backspace' &&
            key !== '#'
        ) {
            e.preventDefault();
        }
    }

    const handleRandomColor = () => {
        const randomColor = chroma.random().hex();
        setColor(randomColor);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
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

    // const text = this.innerText;
    const handleCopy = () => {
alert('function not yet implemented');
    }

    return (
        <>
            <div className="container-home">
                <h1>Color Converter</h1>
                <p>Enter a hex code below to convert it to CMYK, HSL, and RGB.</p>
                <div className="block">
                    <input className="home-input"
                        value={inputValue}
                        onChange={handleInputChange}
                        maxLength={7}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleClick} className='home-button'>convert</button>
                    <button onClick={handleRandomColor} className="random-button">
                        <FaRandom /> random color
                    </button>

                    <Divider />

                </div>
            </div>

            <div className="container-color-converter">
                <div className="container-converter">

                    <div className="box-converter">
                        <h2>CMYK</h2>
                        <div style={{ textAlign: 'left' }}>
                            <p>cmyk: ({cmykArray.join(', ')}) <FaRegCopy color={theme.gray} 
                            onClick={handleCopy}
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
                            <p>hsl: {hslString} <FaRegCopy /></p>
                            <p>hue: {hslObject.hue}º</p>
                            <p>saturation: {hslObject.saturation}%</p>
                            <p>lightness: {hslObject.lightness}%</p>
                        </div>
                    </div>

                    <div className="box-converter">
                        <h2>RGB</h2>
                        <div style={{ textAlign: 'left' }}>
                            <p>rgb: ({rgb.join(', ')}) <FaRegCopy /></p>
                            <p>red: {rgb[0]}</p>
                            <p>green: {rgb[1]}</p>
                            <p>blue: {rgb[2]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ColorConverter;