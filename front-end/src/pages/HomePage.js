import { NavLink } from "react-router"
import './HomePage.css'
import { Button } from "@mui/material"
import useAuth from "../hooks/useAuth"
import {jwtDecode} from "jwt-decode"

export default function HomePage(){
    const { auth } = useAuth()
    const currentUser = jwtDecode(JSON.parse(auth).accessToken) 

    return (
        <div className="page-wrapper">
            {
                currentUser.role === 'shiftLeader'
                ? (
                    <Button variant="contained" style={{width:'80%', marginBlock:'0.5rem'}}>
                        <NavLink style={{textDecoration:"none", color:'white', fontWeight:'bold', fontSize:'2rem'}} to='/listOfOrders'>Vezi comenzile tale</NavLink>
                    </Button>
                )
                :
                <></>
            }
            
            <Button variant="contained" style={{width:'80%', marginBlock:'0.5rem'}}>
                <NavLink style={{textDecoration:"none", color:'white', fontWeight:'bold', fontSize:'2rem'}} to='/assignTables'>Atribuie mese</NavLink>
            </Button>

            <Button variant="contained" style={{width:'80%', marginBlock:'0.5rem'}}>
                <NavLink style={{textDecoration:"none", color:'white', fontWeight:'bold', fontSize:'2rem'}} to='/statistics'>Statistici mese</NavLink>
            </Button>

            {
                currentUser.role === 'admin'
                ? (
                    <>
                        <Button variant="contained" style={{width:'80%', marginBlock:'0.5rem'}}>
                            <NavLink style={{textDecoration:"none", color:'white', fontWeight:'bold', fontSize:'2rem'}} to='/manageTables'>Manage mese</NavLink>
                        </Button>
                        <Button variant="contained" style={{width:'80%', marginBlock:'0.5rem'}}>
                            <NavLink style={{textDecoration:"none", color:'white', fontWeight:'bold', fontSize:'2rem'}} to='/manageUsers'>MANAGe utilizatori</NavLink>
                        </Button>
                    </>
                )
                : <></>
            }
            
        </div>
    )
}