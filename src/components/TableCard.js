import { NavLink } from 'react-router';
import './TableCard.css';
import Timer from './Timer';

export default function TableCard(
    {
        id,
        tableName,
        noBarItems,
        noKitchenItems,
        timer
    }
){
    return (
        <NavLink 
            style={{
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
            }} 
            to={`/${id}`}>
            <div 
                className="table-card-container"
            >
                <div className="table-card-info">
                    <h1>{tableName}</h1>
                    <p>De dus:</p>
                    <ul>
                        <li>Bar: {noBarItems} produse</li>
                        <li>Bucătărie: {noKitchenItems} produse</li>
                    </ul>
                </div>
                <Timer timer={timer} />                
            </div>
        </NavLink>
    )
}