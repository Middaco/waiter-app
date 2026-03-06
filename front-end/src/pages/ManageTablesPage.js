import { Divider } from "@mui/material"
import { useEffect, useState } from "react"
import "./ManageTablesPage.css"
import axios from "axios"
import useAuth from "../hooks/useAuth"
import TableCard from "../components/TableCard"

export default function ManageTablesPage(){
    const [tables, setTables] = useState([])

    const { auth } = useAuth()
    const accessToken = JSON.parse(auth).accessToken

    useEffect(() => {
        axios.get('http://localhost:8080/tables', {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => setTables(res.data))
            .catch(err => console.log(err))
    }, [accessToken])

    const handleSaveTable = async (newTable) => {
        await axios.post('http://localhost:8080/tables', {
            name: newTable
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => setTables(oldTables => [...oldTables, res.data]))
    }

    return (
        <div className="page-wrapper">
            <input 
                className="input-container" 
                type="text"
                placeholder="Masă nouă"
                onKeyDown={(event) => {
                    if(event.key === 'Enter'){
                        handleSaveTable(event.target.value)
                        event.target.value = ''
                    }
                }}
            />
            <Divider variant="middle" flexItem/>
            <div className="tables-list-wrapper">
                {
                    tables.length === 0
                    ? <h1>Nu există mese</h1>
                    : tables.map(table => <TableCard table={table} />)
                }
            </div>
        </div>
    )
}