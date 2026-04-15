import axios from "axios"
import { useEffect, useState, useRef } from "react"
import useAuth from "../hooks/useAuth"
import AssignTablesToWaiterCard from "../components/AssignTablesToWaiterCard"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from "react-router"
import './AssignTablesPage.css'
import { TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import {Box} from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AssignTablesPage = () => {
    const [waiters, setWaiters] = useState([]) 
    const [waiterName, setWaiterName] = useState('')

    const navigate = useNavigate()
    const { auth } = useAuth()
    const accessToken = JSON.parse(auth).accessToken

    const waitersListToUse = (waiterName !== '' ? waiters.filter(waiter => 
        waiter.name.toLowerCase().includes(waiterName.toLowerCase())
    ) : waiters);
    console.log(waiterName)
    console.log(waitersListToUse)

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
        <div className="no-align-justify">
            <div className="page-wrapper">
                <header className="options">
                    <ArrowBackIcon
                        onClick={() => navigate(-1)}
                    />
                    <TextField                             
                        sx={{width: '90%'}}
                        label="Waiter name" 
                        variant="standard" 
                        value={waiterName}
                        onChange={(event) => setWaiterName(event.target.value)}
                    />
                    
                    <MoreVertIcon/>
                </header>
                {
                    waitersListToUse.length === 0
                        ? <h1>Nici un ospătar disponibil</h1>
                        : waitersListToUse.map(waiter => <AssignTablesToWaiterCard key={waiter.id} currentWaiter={waiter}/>)
                }
            </div>
        </div>
    )
}

export default AssignTablesPage