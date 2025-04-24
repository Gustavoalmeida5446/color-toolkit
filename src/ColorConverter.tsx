import './css/index.css'
import { FaRandom, FaRegCopy } from "react-icons/fa";
import chroma from "chroma-js";
import Divider from "./components/divider";
import { useState } from "react";

function ColorConverter() {

    const [color, setColor] = useState('#c62daa');

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
        setColor((document.querySelector('.home-input') as HTMLInputElement)?.value);
    }

    const handleRandomColor = () => {
        alert("This feature is not yet implemented.");
    }

    return (
        <>
            <div className="container-home">
                <h1>Color Converter</h1>
                <p>Enter a hex code below to convert it to CMYK, HSL, and RGB.</p>
                <div className="block">
                    <input className="home-input"
                    />
                    <button onClick={handleClick} className='home-button'>convert</button>
                    <button onClick={handleRandomColor} className="random-button">
                        <FaRandom /> random color
                    </button>

                    <Divider />

                    <div className="box-converter">
                        <h2>CMYK</h2>
                        <div style={{ textAlign: 'left' }}>
                            <p>cmyk: ({cmykArray.join(', ')}) <FaRegCopy /></p>
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