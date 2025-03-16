import { useEffect } from "react"
import { useParams } from "react-router"
import { useState } from "react"
import Timer from "../components/Timer"
import Separator from "../components/Separator"
import "./TableInfoPage.css"
import SectionTitle from "../components/SectionTitle"
import { Checkbox, FormControlLabel } from "@mui/material"

export default function TableInfoPage() {
    const tableId = useParams().id
    const [table, setTable] = useState({})
    const [barItems, setBarItems] = useState([])
    const [kitchenItems, setKitchenItems] = useState([])
    const [flag, setFlag] = useState(0)

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
    },[flag])

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
            <SectionTitle title="Bar" />
            <ul className="items-list-container">
                {barItems.map(item => (
                    <FormControlLabel
                        control={<Checkbox />}
                        label={item.item}
                        checked={item.isDelivered}
                        onChange={e => {
                            fetch(`api/tables/${tableId}/bar/${item.id}/deliver`, {
                                method: "POST"
                            })
                                .then(response => response.json())
                                .then(data => console.log(data))
                            setFlag(item.id);
                        }}
                    />
                ))}
            </ul>
            <SectionTitle title="Bucătărie" />
            <ul className="items-list-container">
                {kitchenItems.map(item => (
                    <FormControlLabel
                        control={<Checkbox />}
                        label={item.item}
                        checked={item.isDelivered}
                    />
                ))}
            </ul>

        </div>
    )
}