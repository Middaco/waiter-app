import { useLocation, useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import Timer from "../components/Timer"
import Separator from "../components/Separator"
import "./OrderInfoPage.css"
import SectionTitle from "../components/SectionTitle"
import ChecklistItem from "../components/ChecklistItem"
import { Select, Radio, FormControlLabel, RadioGroup, LinearProgress, MenuItem, InputLabel, FormControl } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useOutletContext } from "react-router"
import axios from "axios"
import CustomAlert from "../components/Alert"
import OptionsDropdownMenu from "../components/OptionsDropdownMenu"
import { jwtDecode } from "jwt-decode"
import useAuth from "../hooks/useAuth"

export default function OrderInfoPage() {
    const [newItem, setnewItem] = useState('')
    const [selectedLabel, setSelectedLabel] = useState('')
    const [tables, setTables] = useState([])

    const location = useLocation()
    const [currentOrder, setCurrentOrder] = useState(location?.state.currentOrder)
    
    const { auth } = useAuth()
    const { accessToken } = JSON.parse(auth)
    const waiter = jwtDecode(accessToken)

    const navigate = useNavigate()
    const { fetchOrders } = useOutletContext()
    const {alertOpen, setAlertOpen, alertMessage, setAlertMessage, alertSeverity, setAlertSeverity} = useOutletContext()

    const orderId = useParams().id

    useEffect(() => {
        axios.get('http://localhost:8080/tables', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => setTables(res.data))
            .catch(err => console.log(err))
    }, [])

    if(!currentOrder) {
        return (
            <LinearProgress/>
        )
    }

    const handleTableChange = (newTableId) => {
        axios.patch(`http://localhost:8080/order/${orderId}/table`, {
            tableId: newTableId
        }, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            
        })
            .then(() => {
                setCurrentOrder(prevOrder => {return {...prevOrder, tableId: newTableId} })
                console.log('called axios')
                fetchOrders(accessToken)
                setAlertOpen(true)
                setAlertMessage("Numele mesei a fost salvat")
                setAlertSeverity("success")
            })
            .catch(err => {
                setAlertOpen(true)
                setAlertMessage("Eroare la salvarea numelui mesei")
                setAlertSeverity("error")
                console.log("POST Error on back arrow: \n" + err)
            })
    }

    const handleItemSubmit = () => {
        axios.post(`http://localhost:8080/table/${orderId}/newItem`,{
            newItem: newItem,
            type: selectedLabel
        }, {
            headers:{
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            },
        })
            .then((response) =>  {
                console.log(response)
                setnewItem('')
                setAlertOpen(true)
                setAlertMessage("Produs adăugat cu succes")
                setAlertSeverity("success")
                return response.data
            })
            .then(data => {
                console.log(data)
                if(data.type === 'bar'){
                    setCurrentOrder( oldValue => { return {...oldValue, barItems: data.items} })
                }else{
                    setCurrentOrder( oldValue => { return {...oldValue, kitchenItems: data.items} })
                }
            })
            .catch(err => {
                console.log(err)
                setAlertOpen(true)
                setAlertMessage("Eroare la adăugarea produsului")
                setAlertSeverity("error")
            }
        )
    }

    return (
        <div
            className="table-info-container"
        >
            <CustomAlert
                alertOpen={alertOpen}
                setAlertOpen={setAlertOpen}
                alertMessage={alertMessage}
                alertSeverity={alertSeverity}
            />
            <header className="options">
                <ArrowBackIcon
                    onClick={() => navigate(-1)}
                />
                <OptionsDropdownMenu
                    orderId={currentOrder._id}
                    accessToken={accessToken}
                />
            </header>
            <div className="table-info-header">
                <FormControl
                    sx={{
                        fontSize:"3.5em",
                        border:"none",
                        marginRight: "1rem",
                        flexGrow:'2'
                    }}
                    className="table-info-name"
                >
                    <InputLabel id="select-label">
                        Masă
                    </InputLabel>
                    <Select
                        labelId="select-label"
                        label="Masă"
                        value={ currentOrder.tableId }
                        onChange={event => handleTableChange(event.target.value)}
                    >
                        {
                            waiter.assignedTables.map(tableId => {
                                return (
                                    <MenuItem value={tableId}>
                                        {
                                            tables.filter(currentTable => currentTable._id === tableId)[0]?.name
                                        }
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <Timer 
                    orderId={orderId}  
                    deliveredAt={currentOrder.deliveredAt}
                    orderTakenAt={currentOrder.orderTakenAt}
                    isActive={currentOrder.isActive}  
                />
            </div>
            <Separator />
            <div className="input-container">
                <label
                    className="input-field-label"
                    for="new-product-input-field"
                >
                    Requested product:
                </label>
                <input 
                    name='new-product-input-field'
                    type="text" 
                    enterKeyHint="done"
                    className="input-field" 
                    placeholder="Paste carbonara"
                    value={newItem}
                    onChange = {e => setnewItem(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            handleItemSubmit()        
                        }
                    }}
                />
                <label
                    className="input-field-label"
                    for="new-product-radio-buttons"
                >
                    Product type:
                </label>
                <RadioGroup
                    name="new-product-radio-buttons"
                    defaultValue=""
                    row
                    onChange={e => setSelectedLabel(e.target.value)}
                >
                    <FormControlLabel
                        control={<Radio/>}
                        label={"Bar"}
                        value="bar"
                    />
                    <FormControlLabel
                        control={<Radio/>}
                        label={"Bucătărie"}
                        value="kitchen"
                    />
                </RadioGroup>
            </div>
            <SectionTitle title="Bar" />
            <ul className="items-list-container">
                {currentOrder.barItems.map((item, index) => (
                    <ChecklistItem 
                        key={index}
                        orderId={orderId}
                        item={item}
                        index={index}
                        accessToken={accessToken}
                        deliveryUrl={`http://localhost:8080/orders/${orderId}/bar/${item._id}/deliver`}
                        deleteUrl={`http://localhost:8080/orders/${orderId}/bar/${item._id}`}
                        createItemUrl={`http://localhost:8080/orders/${orderId}/bar`}
                        updateItemURL={`http://localhost:8080/orders/${orderId}/bar/${item._id}`}
                    />
                ))}
            </ul>
            <SectionTitle title="Bucătărie" />
            <ul className="items-list-container">
                {currentOrder.kitchenItems.map((item, index) => (
                    <ChecklistItem 
                        key={index}
                        orderId={orderId}
                        item={item}
                        index={index}
                        accessToken={accessToken}
                        deliveryUrl={`http://localhost:8080/orders/${orderId}/kitchen/${item._id}/deliver`}
                        deleteUrl={`http://localhost:8080/orders/${orderId}/kitchen/${item._id}`}
                        createItemUrl={`http://localhost:8080/orders/${orderId}/kitchen`}
                        updateItemURL={`http://localhost:8080/orders/${orderId}/kitchen/${item._id}`}
                    />
                ))}
            </ul>

        </div>
    )
}