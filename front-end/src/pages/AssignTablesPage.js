import axios from "axios"
import { useEffect, useState, useRef } from "react"
import useAuth from "../hooks/useAuth"
import AssignTablesToWaiterCard from "../components/AssignTablesToWaiterCard"

const AssignTablesPage = () => {
    const [waiters, setWaiters] = useState([]) 

    const { auth } = useAuth()
    const accessToken = JSON.parse(auth).accessToken

    useEffect(() => {
        axios.get('http://localhost:8080/waiters', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => {console.log(res)
                setWaiters(res.data)})
            .catch(err => {
                console.log(err)
            })
    }, [accessToken])

    return (
        waiters.length === 0
        ? <h1>Nici un ospătar disponibil</h1>
        : waiters.map(waiter => <AssignTablesToWaiterCard currentWaiter={waiter}/>)
    )
}

export default AssignTablesPage