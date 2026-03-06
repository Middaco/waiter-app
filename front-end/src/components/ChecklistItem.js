import { FormControlLabel } from "@mui/material";
import {Checkbox} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './ChecklistItem.css'
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";
import CustomAlert from "./Alert";

export default function ChecklistItem(
    {
        tableId,
        item,
        setCurrentOrder,
        accessToken,
        deleteUrl,
        deliveryUrl,
        updateItemURL
    }
){
    const {tables} = useOutletContext()
    const [isChecked, setIsChecked] = useState(item.isDelivered)
    const [itemName, setItemName] = useState(item.item)
    const [debouncedName, setDebouncedName] = useState(itemName)
    const { fetchOrders } = useOutletContext();
    const { alertOpen, setAlertOpen, alertMessage, setAlertMessage, alertSeverity, setAlertSeverity } = useOutletContext()
    
    useEffect(() => {
        setIsChecked(item.isDelivered)
        setItemName(item.item) 
    }, [tables, item])

    useEffect(() => {
        const timeout = setTimeout(()=>{
            if(itemName && debouncedName){
                if (itemName !== debouncedName) {
                    console.log(itemName + " " + debouncedName)
                    setDebouncedName(itemName)
                }
            }
            
        },2000)
        return () => {
            clearTimeout(timeout)
        }
    }, [itemName])

    useEffect(() => {
        if(item.item === debouncedName){
            return
        }
        if(!accessToken){
            return
        }
        if (debouncedName === itemName){
            axios.patch(updateItemURL, {
                newItem: debouncedName
            },{
                headers:{
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${accessToken}`
                }
            })
                .then(() => {
                    fetchOrders(accessToken)
                    setAlertOpen(true)
                    setAlertMessage("Produs actualizat cu succes")
                    setAlertSeverity("success")
                })
                .catch(err => {
                    setAlertOpen(true)
                    setAlertMessage("Eroare la actualizarea produsului")
                    setAlertSeverity("error")
                    console.log("PATCH Product update: \n" + err)
                })
        }
        
    }, [debouncedName])

    return(
        <div style={{ display: "flex", alignItems: "center"}}>
            <CustomAlert
                alertOpen={alertOpen}
                setAlertOpen={setAlertOpen}
                alertMessage={alertMessage}
                alertSeverity={alertSeverity}
            />
            <FormControlLabel
                control={<Checkbox />}
                style={{ marginRight: "0.25em" }}
                checked={isChecked}
                onChange={e => {
                    setIsChecked(e.target.checked)
                    console.log(e.target.checked)
                    axios.patch(deliveryUrl, {
                        isDelivered: e.target.checked
                    }, {
                        headers:{
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${accessToken}`
                        }
                    })
                        .then(() => {
                            //fetchOrders(accessToken)
                            setAlertOpen(true)
                            setAlertMessage("Produs livrat cu succes")
                            setAlertSeverity("success")
                        })
                        .catch(err => {
                            setAlertOpen(true)
                            setAlertMessage("Eroare la livrarea produsului")
                            setAlertSeverity("error")
                            console.log(err)
                        })
                }}
            />
            <input
                type="text"
                contentEditable="true"
                value={itemName}
                style={{width: "90%", textDecoration: isChecked ? "line-through" : "none", fontSize: "1.25em"}}
                onChange={(e) => {
                    setItemName(e.target.value)
                }}  
            />
            <DeleteIcon 
                className="delete-button"
                onClick={e => {
                    axios.delete(deleteUrl,{
                        headers:{
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${accessToken}`
                        }
                    })
                        .then(res => {
                            setAlertOpen(true)
                            setAlertMessage("Produs sters cu succes")
                            setAlertSeverity("success")
                        })
                        .catch(err => {
                            console.log(err)
                            setAlertOpen(true)
                            setAlertMessage("Eroare la stergerea produsului")
                            setAlertSeverity("error")    
                        })
                }}
            />
        </div>
    )
}