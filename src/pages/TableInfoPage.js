import { useNavigate, useParams } from "react-router"
import { useState } from "react"
import Timer from "../components/Timer"
import Separator from "../components/Separator"
import "./TableInfoPage.css"
import SectionTitle from "../components/SectionTitle"
import ChecklistItem from "../components/ChecklistItem"
import { Radio, FormControlLabel, RadioGroup } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useOutletContext } from "react-router"

export default function TableInfoPage() {
    const tableId = useParams().id
    const setTables = useOutletContext().setTables
    const [table, setTable] = useState(useOutletContext().tables.find(table => table.id === tableId))
    const [barItems, setBarItems] = useState(table.barItems)
    const [kitchenItems, setKitchenItems] = useState(table.kitchenItems)
    const [newItem, setnewItem] = useState('')
    const [selectedLabel, setSelectedLabel] = useState()
    const navigate = useNavigate()

    return (
        <div
            className="table-info-container"
        >
            <header className="options">
                <ArrowBackIcon
                    onClick={() => navigate('/')}
                />
                <MoreVertIcon/>
            </header>
            <div className="table-info-header">
                <input
                    type="text"
                    placeholder="Masă"
                    value={table.name}
                    className="table-info-name"
                    onChange={e => {
                        setTable({ ...table, name: e.target.value })
                        setTables(oldTables => oldTables.map(oldTable => {
                            if(oldTable.id === tableId){
                                return { ...oldTable, name: e.target.value }
                            }
                            return oldTable
                        }))

                        fetch(`/api/tables/${tableId}/name`, {
                            method: "POST",
                            body: JSON.stringify({ name: e.target.value })
                        })
                    }}
                />
                <Timer timer={table.timer} />
            </div>
            <Separator />
            <div className="input-container">
                <input 
                    style={{
                        width:"100%",
                        fontSize:"2em",
                        marginTop:"0.5em",
                        padding:"0.25em",
                        boxSizing:"border-box"
                    }}
                    type="text" 
                    enterKeyHint="done"
                    classname="input-field" 
                    placeholder="Produs nou..."
                    value={newItem}
                    onChange = {e => setnewItem(e.target.value)}
                    onKeyDown={e => {
                        if(e.key === "Enter"){
                            if(selectedLabel === "bar"){
                                setBarItems([...barItems, {id: null, item: newItem, isDelivered: false}])
                            }else{
                                setKitchenItems([...kitchenItems, {id: null, item: newItem, isDelivered: false}])
                            }
                            fetch(`/api/table/${tableId}/newItem`, {
                                method: "POST",
                                body: {
                                    item: newItem,
                                    type: selectedLabel
                                }
                            })
                            .then(response => response.json())
                            .then(data => {
                                setTables(oldTables => oldTables.map(oldTable => {
                                    if(oldTable.id === tableId){
                                        if(selectedLabel === "bar"){
                                            setBarItems(oldBarItems => oldBarItems.map(oldItem => {
                                                if(oldItem.id === null){
                                                    return { ...oldItem, id: data.id }
                                                }
                                                return oldItem
                                            }))
                                            return { ...oldTable, barItems: data }
                                        }
                                        setKitchenItems(oldKitchenItems => oldKitchenItems.map(oldItem => {
                                            if(oldItem.id === null){
                                                return { ...oldItem, id: data.id }
                                            }
                                            return oldItem
                                        }))
                                        return { ...oldTable, kitchenItems: data }
                                    }
                                    return oldTable
                                }))
                            })
                            .then(setnewItem(''))
                    }}}
                />
                <RadioGroup
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
                {barItems.map((item, index) => (
                    <ChecklistItem 
                        item={item}
                        index={index}
                        listOfItems={barItems}
                        setListOfItems={setBarItems}
                        deliveryUrl={`api/tables/${tableId}/bar/${item.id}/deliver`}
                        deleteUrl={`api/tables/${tableId}/bar/${item.id}`}
                        createItemUrl={`api/tables/${tableId}/bar`}
                    />
                ))}
            </ul>
            <SectionTitle title="Bucătărie" />
            <ul className="items-list-container">
                {kitchenItems.map((item, index) => (
                    <ChecklistItem 
                        item={item}
                        index={index}
                        listOfItems={kitchenItems}
                        setListOfItems={setKitchenItems}
                        deliveryUrl={`api/tables/${tableId}/kitchen/${item.id}/deliver`}
                        deleteUrl={`api/tables/${tableId}/kitchen/${item.id}`}
                        createItemUrl={`api/tables/${tableId}/kitchen`}
                    />
                ))}
            </ul>

        </div>
    )
}