import './Input.css';
import type { InputProps } from '../../interfaces/InputProps';

function Input({ label, name, type = 'text', value, onChange, placeholder }: InputProps) {
  return (
    <div className="input-class">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
