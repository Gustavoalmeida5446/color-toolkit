import { FaRandom } from 'react-icons/fa';

interface ColorInputProps {
    inputValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onConvert: () => void;
    onRandom: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
}

const InputSection: React.FC<ColorInputProps> = ({ inputValue, onChange, onConvert, onRandom, onKeyDown }) => {
    return (
        <div className="block">
            <input
                className="home-input"
                value={inputValue}
                onChange={onChange}
                maxLength={7}
                onKeyDown={onKeyDown}
            />
            <button onClick={onConvert} className='home-button'>convert</button>
            <button onClick={onRandom} className="random-button">
                <FaRandom /> random color
            </button>
        </div>
    );
};

export default InputSection;