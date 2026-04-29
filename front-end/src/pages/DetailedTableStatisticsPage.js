import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { NavLink, useNavigate, useParams } from 'react-router'
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { Button, Divider } from '@mui/material';

export default function DetailedTableStatisticsPage(){
    const navigate = useNavigate();
    const tableId = useParams().id;

    const [orders, setOrders] = useState([])
    console.log(tableId)
    const { auth } = useAuth()
    const { accessToken } = JSON.parse(auth)

    useEffect(() => {
        axios.get(`http://localhost:8080/orders/${tableId}`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => setOrders(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='no-align-justify'>
            <div className='page-wrapper'>
                <header className="options">
                    <ArrowBackIcon
                        onClick={() => navigate(-1)}
                    />
                </header>
                <div className='button-list-wrapper'>
                    {
                        orders.map(order => { 
                            const dateObjTaken = new Date(order.orderTakenAt)
                            
                            return (
                                <NavLink className="list-item-link" to={`${order._id}`} state={order}>
                                    <Button key={order._id} className="list-item-button" variant='contained'>
                                        <>
                                            {
                                                dateObjTaken.getUTCDate().toString().padStart(2, '0') + "/" +
                                                (dateObjTaken.getUTCMonth() + 1).toString().padStart(2, '0')
                                            }
                                        </>
                                        <Divider orientation='vertical' flexItem sx={{borderRightWidth:'0.5rem'}}/>
                                        <>
                                            {
                                                dateObjTaken.getHours().toString().padStart(2, '0') + ":" +
                                                dateObjTaken.getMinutes().toString().padStart(2, '0') + ":" +
                                                dateObjTaken.getSeconds().toString().padStart(2, '0')
                                            }
                                        </>
                                    </Button>
                                </NavLink>
                            )
                        })
                    }
                </div>

            </div>
        </div>
        
    ) 
}