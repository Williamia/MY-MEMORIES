import './Card.css';
import type { CardProps } from '../../interfaces/CardProps';

function Card({ children }: CardProps) {

  return (
    <div className="card-container">
      {children}
    </div>
  );
}  

export default Card;