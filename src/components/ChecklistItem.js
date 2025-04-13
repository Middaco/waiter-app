import { FormControlLabel } from "@mui/material";
import {Checkbox} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './ChecklistItem.css'
import { useState } from "react";
export default function ChecklistItem(
    {
        item,
        listOfItems,
        setListOfItems,
        deleteUrl,
        deliveryUrl
    }
){
    const [isChecked, setIsChecked] = useState(item.isDelivered)

    return(
        <div style={{ display: "flex", alignItems: "center"}}>
            <FormControlLabel
                control={<Checkbox />}
                style={{ marginRight: "0.25em" }}
                checked={isChecked}
                onChange={e => {
                    setIsChecked(e.target.checked)
                    setListOfItems(listOfItems.map(listItem => {
                        if (listItem.id === item.id) {
                            return { ...listItem, isDelivered: e.target.value }
                        }
                        return listItem
                    }))
                    fetch(deliveryUrl, {
                        method: "POST"
                    })
                        .then(response => response.json())
                        .then(data => setListOfItems(data))  
                }}
            />
            <div
                contentEditable="true"
                value={item.item}
                suppressContentEditableWarning={true}
                style={{width: "90%", textDecoration: isChecked ? "line-through" : "none", fontSize: "1.25em"}}
                onChange={(e) => {
                    setListOfItems(listOfItems.map(listItem => {
                        if (listItem.id === item.id) {
                            return { ...listItem, item: e.target.value }
                        }
                        return listItem
                    }))
                }}  
            >
                {item.item}
            </div>
            <DeleteIcon 
                className="delete-button"
                onClick={e => {
                    setListOfItems(listOfItems.filter(listItem => listItem.id !== item.id))
                    fetch(deleteUrl, {
                        method:"DELETE"
                    })
                        .then(response => response.json())
                        .then(data => setListOfItems(data))
                        .then(() => {console.log("Deleted")})
                    }
                }
            />
        </div>
    )
}