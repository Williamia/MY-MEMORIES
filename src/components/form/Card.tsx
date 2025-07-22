import './Card.css';
import type { CardProps } from '../../interfaces/CardProps';

function Card({ children, image }: CardProps) {

  return (
    <div className="card-container">
      {image && <img src={image} alt="Card Image" className='card-image'/>}
      {children}
    </div>
  );
}  

export default Card;