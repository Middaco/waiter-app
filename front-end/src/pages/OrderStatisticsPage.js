import { useNavigate, useLocation } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from '@mui/x-charts/PieChart';
import './OrderStatisticsPage.css'
import { Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";

export default function OrderStatisticsPage(){
    const [user, setUser] = useState('')
    console.log(user)
    const location = useLocation()
    const order = location.state
    const navigate = useNavigate()
    const { auth } = useAuth()
    const { accessToken } = JSON.parse(auth)
    
    useEffect(() => {
        axios.get(`http://localhost:8080/user/${order.waiterId}`, {
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                    .then(res => setUser(res.data))
                    .catch(err => console.log(err))
    }, [])

    return(
        <div className='no-align-justify'>
            <div className='page-wrapper'>
                <header className="options">
                    <ArrowBackIcon onClick={() => navigate(-1)}/>
                </header>
                <div className="statistics-page-content-wrapper">
                    <div className="statistics-page-chart-wrapper">
                        <PieChart
                            series={[
                                {
                                data: [
                                    { id: 0, value: order.barItems.length, label: 'Bar' },
                                    { id: 1, value: order.kitchenItems.length, label: 'Kitchen' }
                                ],
                                arcLabel: "formattedValue"
                                },
                            ]}
                        />
                    </div>
                    <div className="statistics-page-details">
                        <div className="statistics-page-details-column">
                            <Typography>
                                Is Active:  
                                <Typography display='inline' fontWeight='bold' color={order.isActive.toString().toUpperCase()? "green" : "red"}>
                                    {order.isActive.toString().toUpperCase()}
                                </Typography>
                            </Typography>
                            <Typography>
                                Taken At: {new Date(order.orderTakenAt).toString().slice(0, new Date(order.orderTakenAt).toString().search(/(GMT)/))}
                            </Typography>
                            <Typography>
                                Delivered At: {order.orderDeliveredAt ? new Date(order.orderDeliveredAt).toString().slice(0, new Date(order.orderDeliveredAt).toString().search(/(GMT)/)) : ""}
                            </Typography>
                        </div>
                        <div className="statistics-page-details-column">
                            <Typography>
                                Waiter: {user.name}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}