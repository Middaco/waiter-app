import { useEffect, useState } from "react"
import axios from "axios"
import useAuth from "../hooks/useAuth"
import './TablesStatisticsPage.css'
import TableStatisticsCard from "../components/TableStatisticsCard"

export default function TablesStatisticsPage(){
    const [tables, setTables] = useState([])

    const { auth } = useAuth()
    const { accessToken } = JSON.parse(auth)
    
    useEffect(() => {
        axios.get('http://localhost:8080/tables', {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => setTables(res.data))
    }, [])

    return (
        <div className="table-list-wrapper">
            {
                tables.map(table => (
                    <TableStatisticsCard table={table} /> 
                    )
                )
            }
        </div>
    )
}