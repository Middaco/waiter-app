import { NavLink } from 'react-router';
import './OrderCard.css';
import Timer from './Timer';
import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import axios from 'axios';

export default function OrderCard(
    {
        order,
        accessToken
    }
){
    // const [currentOrder, setCurrentOrder] = useState(order)
    const [tables, setTables] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/tables', {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => setTables(res.data))
            .catch(err => console.log(err))
    }, [])

    const elapsedMinutes = order?.deliveredAt ? 
        -1
        :
        Math.floor((Date.now() - new Date(order?.orderTakenAt).getTime()) / 60000)
    ;

    if(!order){
        return <Skeleton variant='rounded'/>
    }

    return (
        <NavLink 
            style={{
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
            }} 
            to={`${order?._id}`}
            state={{currentOrder: order, accessToken:accessToken}}
            >
            <div 
                className={`table-card-container
                        ${elapsedMinutes >= 10 ? "on-fire" : ""}
                        ${elapsedMinutes === -1 ? "delivered" : ""}
                    `}
                        
            >
                <div className="table-card-info">
                    <h1>{ tables.filter(currentTable => currentTable._id === order.tableId)[0]?.name }</h1>
                    <p>De dus:</p>
                    <ul>
                        <li>Bar: {order.barItems.filter(item => {if(!item.isDelivered) return item}).length} produse</li>
                        <li>Bucătărie: {order.kitchenItems.filter(item => {if(!item.isDelivered) return item}).length} produse</li>
                    </ul>
                </div>
                <Timer 
                    deliveredAt={order.deliveredAt}
                    orderTakenAt={order.orderTakenAt}
                    isActive={order.isActive}
                />                
            </div>
        </NavLink>
    )
}