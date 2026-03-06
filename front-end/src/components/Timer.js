import { useEffect, useState } from "react";
import "./Timer.css";

export default function Timer(
    {
        deliveredAt,
        orderTakenAt,
        isActive
    }
){
    const convertedTimeOrderWasPicked = new Date(orderTakenAt).getTime()

    const [minutes, setMinutes] = useState(-1)
    const [seconds, setSeconds] = useState(-1)
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isActive) {
                setMinutes(Math.floor((new Date(deliveredAt).getTime() - convertedTimeOrderWasPicked) / 60000))
                setSeconds(Math.floor((new Date(deliveredAt).getTime() - convertedTimeOrderWasPicked) / 1000) % 60)
                return
            }else{
                setMinutes( Math.floor((new Date().getTime() - convertedTimeOrderWasPicked) / 60000) )
                setSeconds(Math.floor((new Date().getTime() - convertedTimeOrderWasPicked) / 1000) % 60)
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive]);

    if(minutes === -1 || seconds === -1){
        return (
            <div className="table-card-timer">
                <h1>...</h1>
            </div>
        )
    }

    if(!orderTakenAt){
        return (
            <div className="table-card-timer">
                <h1>Loading</h1>
            </div>
        )
    }

    return (
        <div className="table-card-timer">
            <h1>{minutes.toString().padStart(2, '0')} : {seconds.toString().padStart(2, '0')}</h1>
        </div>
    )
}