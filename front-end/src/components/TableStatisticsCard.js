import { useEffect, useState } from 'react'
import './TableStatisticsCard.css'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import { Divider } from '@mui/material'


//TODO: Style this
export default function TablesStatisticsPage({
    table
}){
    const [isVisible, setIsVisible] = useState(false)
    const [orders, setOrders] = useState([])

    const { auth } = useAuth()
    const { accessToken } = JSON.parse(auth)

    useEffect(() => {
        axios.get(`http://localhost:8080/orders/${table._id}`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => setOrders(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleClick = () => {
        setIsVisible(oldValue => !oldValue)
        console.log(isVisible)
    }

    const countUndeliveredItems = (order) => {
        let countUndeliveredItems = 0;
        for(let item = 0; item < order.barItems.length; item++){
            if(!order.barItems[item].isDelivered){
                countUndeliveredItems += 1;
            }
        }
        for(let item = 0; item < order.kitchenItems.length; item++){
            if(!order.kitchenItems[item].isDelivered){
                countUndeliveredItems += 1;
            }
        }
        return countUndeliveredItems
    }

    return (
        <>
            <div className="table-statistics-card" onClick={handleClick}>
                {table.name}
            </div>
            {
                isVisible
                ?
                <ul className='list-of-statistics'>
                    {
                        orders.map(order => { 
                            const dateObjTaken = new Date(order.orderTakenAt)
                            const hourTaken = dateObjTaken.getHours()
                            const minutesTaken = dateObjTaken.getMinutes()

                            const dateObjDelivered = new Date(order.deliveredAt)
                            const hourDelivered = dateObjDelivered?.getHours()
                            const minutesDelivered = dateObjDelivered?.getMinutes()

                            const undeliveredItems = countUndeliveredItems(order)
                            const totalItems = order.barItems.length + order.kitchenItems.length
                            return (
                                <li>
                                    <h3>Preluată: {hourTaken}:{minutesTaken}</h3>
                                    {
                                        !hourDelivered
                                        ?
                                        <h3>Livrată:</h3>
                                        :
                                        <h3>Livrată: {hourDelivered}:{minutesDelivered}</h3>
                                    }
                                    <h3>Obiecte nelivrate: {undeliveredItems}</h3>
                                    <h3>Obiecte totale comandate: {totalItems}</h3>
                                    <Divider/>
                                </li>
                            )
                        })
                    }
                </ul>
                :
                <></>
            }
        </>
    )
}