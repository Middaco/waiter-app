import { useEffect, useState } from "react"
import axios from "axios"
import useAuth from "../hooks/useAuth"
import './TablesStatisticsPage.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink, useNavigate } from "react-router"
import { Button } from "@mui/material"

export default function TablesStatisticsPage(){
    const [tables, setTables] = useState([])
    const navigate = useNavigate()
    console.log(tables[0])
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
    }, [accessToken])

    return (
        <div className="no-align-justify">
            <div className="page-wrapper">
                <header className="options">
                    <ArrowBackIcon
                        onClick={() => navigate(-1)}
                    />
                </header>
                <div className="button-list-wrapper">
                {
                    tables.map(table => (
                        <NavLink key={table.id} className="list-item-link" to={`${table._id}`}>
                            <Button className="list-item-button" variant="contained">{table.name}</Button>
                        </NavLink>
                        )
                    )
                }
                </div>
            </div>
        </div>
    )
}