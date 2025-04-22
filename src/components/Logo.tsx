import theme from "../theme";
import '../css/logo.css';

function Logo() {
    return (
        <div className="logo">
            <div className="square"
                style={{
                    background: `linear-gradient(45deg, ${theme.gradientColor1}, ${theme.gradientColor2})`,
                }}
            >
            </div>
            <div className="text">
                <div
                    className="color"
                    style={{ color: theme.white }}
                >
                    COLOR
                </div>
                <div
                    className="toolkit"
                    style={{ color: theme.white }}
                >
                    toolkit
                </div>
            </div>
        </div>
    )
}

export default Logo;