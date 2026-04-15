import './AssignTablesToWaiterCard.css'
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import useAuth from '../hooks/useAuth'
import { CardActions, Button, Card, ClickAwayListener, Popper, Skeleton } from '@mui/material'
export default function AssignTablesToWaiterCard({
    currentWaiter
}) {
    
    const [waiter, setWaiter] = useState(currentWaiter)
    const [tablesListVisibility, setTablesListVisibility] = useState(false)
    const [tables, setTables] = useState([])
    console.log(currentWaiter)

    const { auth } = useAuth()
    const { accessToken } = JSON.parse(auth)

    const anchorRef = useRef(null)

    const ROLES = {
        'waiter': 'Ospătar',
        'shiftLeader': 'Șef de sală'
    }

    useEffect(() => {
        axios.get('http://localhost:8080/tables', {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => setTables(res.data))
            .catch(err => console.log(err))
    }, [waiter])

    const handleClose = () => {
        setTablesListVisibility(false)
    }

    const handleTableAssignment = async (tableId) => {
        await axios.patch(`http://localhost:8080/assignTable/${waiter._id}`, {
            tableId: tableId
        }, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => setWaiter(res.data))
            .catch(err => console.log(err))
    }

    const handleTableUnassigment = async (tableId) => {
        await axios.patch(`http://localhost:8080/unassignTable/${waiter._id}`, {
            tableId: tableId
        }, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => setWaiter(res.data))
            .catch(err => console.log(err))
    }

    if(!waiter){
        return <Skeleton className='waiter-card' variant='rounded'/>
    }

    return (
        <div>
            <div className='waiter-card' onClick={() => setTablesListVisibility(true)} ref={anchorRef}>
                <h1>{waiter.name}</h1>
                <h2>{ROLES[waiter.role]}</h2>
            </div>
            <Popper
                open={tablesListVisibility}
                placement='bottom'
                anchorEl={anchorRef.current}
            >
                <ClickAwayListener onClickAway={handleClose}>
                    <Card>
                        <CardActions>
                            {
                                tables.map(table => {
                                    // console.log(table)
                                    return(
                                        <Button
                                            variant={waiter.assignedTables.find(currentTable => currentTable === table._id) ?'contained' : 'outlined'}
                                            disabled={table.assigned && !waiter.assignedTables.find(currentTable => currentTable === table._id)}
                                            onClick={() => {
                                                if(waiter.assignedTables.find(currentTable => currentTable === table._id)){
                                                    handleTableUnassigment(table._id)    
                                                }else{
                                                    handleTableAssignment(table._id)
                                                }
                                            }}
                                        >
                                            {table.name}
                                        </Button>
                                    )
                                })
                            }
                        </CardActions>
                    </Card>
                </ClickAwayListener>
            </Popper>
            
        </div>
        
    )
}