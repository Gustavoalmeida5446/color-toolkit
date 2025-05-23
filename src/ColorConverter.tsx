import './css/style.css'
import { FaRegCopy } from "react-icons/fa";
import chroma from "chroma-js";
import { useEffect, useState } from "react";
import theme from './theme';
import Footer from './components/Footer';
import InputSection from './components/InputSection';
import { getCMYK, getHSL, getRGB, copyToClipboard } from "./utils";
import { useParams, useNavigate } from 'react-router';


function ColorConverter() {

    const { hex } = useParams();
    const navigate = useNavigate();
    const initialColor = chroma.valid(`#${hex}`) ? `#${hex}` : chroma.random().hex();

    const [color, setColor] = useState(initialColor);
    const [inputValue, setInputValue] = useState(color);
    const cmykArray = getCMYK(color);
    const { hslObject, hslString } = getHSL(color);
    const rgb = getRGB(color);
    const formattedColor = color.replace('#', '');

    useEffect(() => {
        setInputValue(color);
    }, [color]);

    useEffect(() => {
        const container = document.querySelector('.container-converter') as HTMLDivElement;
        if (chroma.valid(color)) {
            container.style.backgroundColor = color;
        }
    }, [color]);

    useEffect(() => {
        if (chroma.valid(color)) {
            navigate(`/color-converter/color/${formattedColor}`, { replace: true });
        }
    }, [color, navigate]);

    const handleCopy = (text: string) => {
        copyToClipboard(text);
    }

    const handleRandomColor = () => {
        const randomColor = chroma.random().hex();
        setColor(randomColor);
        setInputValue(randomColor);
        navigate(`/color-converter/color/${formattedColor}`, { replace: true });
    }

    const handleInputChange = (value: string) => {
        setInputValue(value);
        navigate(`/color-converter/color/${formattedColor}`, { replace: true });
    };

    const handleClick = () => {
        const colorInput = inputValue.trim().toUpperCase().replace('#', '').replace(/[^0-9A-F]/g, "").slice(0, 6);

        if (chroma.valid(colorInput)) {
            setColor(`#${colorInput}`);
            navigate(`/color-converter/color/${formattedColor}`, { replace: true });

        } else {
            alert('Invalid color format. Please enter a valid hex code. e.g. #FF5733');
        }
    }

    return (
        <>
            <div className="container-home">
                <h1>Color Converter</h1>
                <p>Enter a hex code below to convert it to CMYK, HSL, and RGB.</p>
                <InputSection
                    inputValue={inputValue}
                    onConvert={handleClick}
                    onRandomColor={handleRandomColor}
                    onInputChange={handleInputChange}
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