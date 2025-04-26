import './css/style.css'
import { FaRegCopy } from "react-icons/fa";
import chroma from "chroma-js";
import { useEffect, useState } from "react";
import theme from './theme';
import Footer from './components/Footer';
import InputSection from './components/InputSection';
import { copyToClipboard, getShadesArray, getTintsArray } from "./utils";
import { useParams, useNavigate } from 'react-router';


function TintsAndShades() {

    const { hex } = useParams();
    const navigate = useNavigate();
    const initialColor = chroma.valid(`#${hex}`) ? `#${hex}` : chroma.random().hex();

    const [color, setColor] = useState(initialColor);
    const [inputValue, setInputValue] = useState(color);
    const formattedColor = color.replace('#', '');



    const tints = getTintsArray(color);
    const shades = getShadesArray(color);

    const tintsArray = tints.map((tint, index) => {
        const textColor = chroma.contrast(tint, '000000') >= 4.5 ? theme.black : theme.white;
        return (
            <div key={'tint' + index} className="box-color"
                style={{ backgroundColor: tint, color: textColor }}>
                <p>{tint}
                    <FaRegCopy color={textColor}
                        onClick={() => handleCopy(tint)}
                    />
                </p>
            </div>
        )
    });

    const shadesArray = shades.map((tint, index) => {
        const textColor = chroma.contrast(tint, '000000') >= 4.5 ? theme.black : theme.white;
        return (
            <div key={'tint' + index} className="box-color"
                style={{ backgroundColor: tint, color: textColor }}>
                <p>{tint}
                    <FaRegCopy color={textColor} onClick={() => handleCopy(tint)} />
                </p>

            </div>
        )
    });

    useEffect(() => {
        setInputValue(color);
    }, [color]);

    useEffect(() => {
        if (chroma.valid(color)) {
            navigate(`/tints-and-shades/color/${formattedColor}`, { replace: true });
        }
    }, [color, navigate]);

    useEffect(() => {
        const container = document.querySelector('.container-converter') as HTMLDivElement;
        if (chroma.valid(color)) {
            container.style.backgroundColor = color;
        }
    }, [color]);

    const handleCopy = (text: string) => {
        copyToClipboard(text);
    }

    const handleRandomColor = () => {
        const randomColor = chroma.random().hex();
        setColor(randomColor);
        setInputValue(randomColor);
        navigate(`/tints-and-shades/color/${formattedColor}`, { replace: true });
    }

    const handleInputChange = (value: string) => {
        setInputValue(value);
        navigate(`/tints-and-shades/color/${formattedColor}`, { replace: true });
    };

    const handleClick = () => {
        const colorInput = inputValue.trim().toUpperCase().replace('#', '').replace(/[^0-9A-F]/g, "").slice(0, 6);

        if (chroma.valid(colorInput)) {
            setColor(`#${colorInput}`);
            navigate(`/tints-and-shades/color/${formattedColor}`, { replace: true });

        } else {
            alert('Invalid color format. Please enter a valid hex code. e.g. #FF5733');
        }
    }

    return (
        <>
            <div className="container-home">
                <h1>Tints and Shades</h1>
                <p>Enter a hex code below to convert it to CMYK, HSL, and RGB.</p>
                <InputSection
                    inputValue={inputValue}
                    onConvert={handleClick}
                    onRandomColor={handleRandomColor}
                    onInputChange={handleInputChange}
                />
            </div>

            ]
            <div className="container-color-tints-and-shades">
                <div className="container-converter">
                    <div className="container-tints-and-shades">

                        <div className="box-tints-and-shades">
                            <h2>tints</h2>
                            <div>
                                <span>{tintsArray}</span>
                            </div>
                        </div>

                        <div className="box-tints-and-shades">
                            <h2>shades</h2>
                            <div>
                                <span>{shadesArray}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default TintsAndShades;