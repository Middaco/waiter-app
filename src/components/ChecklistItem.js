import { FormControlLabel } from "@mui/material";
import {Checkbox} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './ChecklistItem.css'
export default function ChecklistItem(
    {
        item,
        listOfItems,
        setListOfItems,
        setFlag,
        deleteUrl,
        deliveryUrl
    }
){
    return(
        <div style={{ display: "flex", alignItems: "center"}}>
            <FormControlLabel
                control={<Checkbox />}
                style={{ marginRight: "0.25em" }}
                checked={item.isDelivered}
                onChange={e => {
                    fetch(deliveryUrl, {
                        method: "POST"
                    })
                        .then(response => response.json())
                        .then(data => console.log(data))
                    setFlag(item.isDelivered);
                }}
            />
            <div
                contentEditable="true"
                value={item.item}
                style={{width: "90%", textDecoration: item.isDelivered ? "line-through" : "none", fontSize: "1.25em"}}
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
                onClick={e => fetch(deleteUrl, {
                    method:"delete"
                })
                    .then(response => response.json())
                    .then(data => setListOfItems(data))
                }
            />
        </div>
    )
}