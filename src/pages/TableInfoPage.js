import { useEffect } from "react"
import { useParams } from "react-router"
import { useState } from "react"
import Timer from "../components/Timer"
import Separator from "../components/Separator"
import "./TableInfoPage.css"
import SectionTitle from "../components/SectionTitle"
import ChecklistItem from "../components/ChecklistItem"
import { Radio, FormControlLabel, RadioGroup } from "@mui/material"

export default function TableInfoPage() {
    const tableId = useParams().id
    const [table, setTable] = useState({})
    const [barItems, setBarItems] = useState([])
    const [kitchenItems, setKitchenItems] = useState([])
    const [flag, setFlag] = useState(0)
    const [newItem, setnewItem] = useState()
    const [selectedLabel, setSelectedLabel] = useState()

    useEffect(() => {
        fetch(`/api/tables/${tableId}`)
            .then(response => response.json())
            .then(data => setTable(data.table))
        fetch(`/api/tables/${tableId}/bar`)
            .then(response => response.json())
            .then(data => setBarItems(data))
        fetch(`/api/tables/${tableId}/kitchen`)
            .then(response => response.json())
            .then(data => setKitchenItems(data))
    },[flag, tableId])

    return (
        <div
            className="table-info-container"
        >
            <header className="table-info-header">
                <input
                    type="text"
                    value={table.name}
                    className="table-info-name"
                    onChange={e => {
                        setTable({ ...table, name: e.target.value })
                        fetch(`/api/tables/${tableId}/name`, {
                            method: "POST",
                            body: JSON.stringify({ name: e.target.value })
                        })
                    }}
                />
                <Timer timer={table.timer} />
            </header>
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
                    classname="input-field" 
                    placeholder="Produs nou..."
                    value={newItem}
                    onChange = {e => setnewItem(e.target.value)}
                    onKeyDown={e => {
                        if(e.key === "Enter")
                            fetch(`/api/table/${tableId}/newItem`, {
                                method: "POST",
                                body: {
                                    item: newItem,
                                    type: selectedLabel
                                }
                            })
                            .then(response => response.json())
                            .then(data => {
                                if(selectedLabel === "bar"){
                                    setBarItems(data)
                                }else{
                                    setKitchenItems(data)
                                }
                            })
                            .then(setnewItem(''))
                    }}
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
                        setFlag={setFlag}
                        deliveryUrl={`api/tables/${tableId}/bar/${item.id}/deliver`}
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
                        setFlag={setFlag}
                        deliveryUrl={`api/tables/${tableId}/kitchen/${item.id}/deliver`}
                        createItemUrl={`api/tables/${tableId}/kitchen`}
                    />
                ))}
            </ul>

        </div>
    )
}