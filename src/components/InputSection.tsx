import { FaRandom } from 'react-icons/fa';

interface ColorInputProps {
    inputValue: string;
    onConvert: () => void;
    onInputChange: (value: string) => void;
    onRandomColor: () => void;
}

const InputSection: React.FC<ColorInputProps> = ({ 
    inputValue,
    onConvert,
    onInputChange,
    onRandomColor
 }) => {

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const key = e.key.toUpperCase();
        if (key === 'ENTER') {
            onConvert();
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.toUpperCase().replace(/[^#0-9A-F]/g, '');
        onInputChange(input);
    }

    return (
        <div className="block">
            <input
                className="home-input"
                value={inputValue}
                onChange={handleChange}
                maxLength={7}
                onKeyDown={handleKeyDown}
            />
            <button onClick={onConvert} className='home-button'>convert</button>
            <button onClick={onRandomColor} className="random-button">
                <FaRandom /> random color
            </button>
        </div>
    );
};

export default InputSection;