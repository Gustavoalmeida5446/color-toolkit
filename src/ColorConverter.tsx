import theme from "./theme";

const color = theme.mainColor;

function ColorConverter() {
  
    return (
        <div>
            <h1>Color Converter</h1>
            <p>Convert color codes between different formats.</p>
            <p style={{color: color}}>{color}</p>
        </div>
    );
}

export default ColorConverter;