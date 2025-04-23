import "./css/index.css";
import Logo from "./components/Logo";
import {
    FaLowVision,
    FaExchangeAlt,
    FaTint,
    FaPalette,
    FaProjectDiagram,
    FaFillDrip
} from "react-icons/fa";
import Divider from "./components/divider";
import { useNavigate } from "react-router";

function Home() {

  const navigate = useNavigate();
  const handleClick = () => {
    alert("This feature is not yet implemented.");
  }

    return (
        <div >
            <div className="container-home">
                <Logo />
                <div className="block">
                    <p>This tool helps you explore and manipulate colors with ease.
                        You can convert color codes between different formats, test contrast for accessibility, generate tints and shades, build palettes using design principles, create color combinations, and generate color scales for gradients or data visualizations.
                        It's useful for designers, developers, and anyone working with color in digital projects.
                    </p>

                    <Divider />

                    <div className="box">
                        <FaLowVision />
                        <p>
                            Check if two colors have good contrast for readability and accessibility.
                        </p>
                        <button
                            onClick={handleClick}
                        >contrast checker</button>
                    </div>
                    <div className="box">
                        <FaExchangeAlt />
                        <p>
                            Convert your HEX code to RGB, HSL, or CMYK formats.
                        </p>
                        <button
                            onClick={() => navigate('/ColorConverter')}
                        >code converter</button>
                    </div>
                    <div className="box">
                        <FaTint />
                        <p>
                            Generate lighter tints and darker shades of your color.
                        </p>
                        <button
                            onClick={handleClick}
                        >tints and shades generator</button>
                    </div>
                    <div className="box">
                        <FaProjectDiagram />
                        <p>
                            Create a balanced color palette using the 60-30-10 design rule.
                        </p>
                        <button
                            onClick={handleClick}
                        >palette generator</button>
                    </div>
                    <div className="box">
                        <FaPalette />
                        <p>
                            Explore color combinations like triad, complementary, and others.
                        </p>
                        <button
                            onClick={handleClick}
                        >color combinations</button>
                    </div>
                    <div className="box">
                        <FaFillDrip />
                        <p>
                            Generate a smooth color scale between two colors.
                        </p>
                        <button
                            onClick={handleClick}
                        >color scale</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;