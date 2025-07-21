import type { ButtonProps } from '../../interfaces/ButtonProps';
import './Button.css';

function Button({ text, onClick, type = 'button' }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className="button-class">
      {text}
    </button>
  );
}

export default Button;
