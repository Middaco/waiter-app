import { FormControlLabel } from "@mui/material";
import {Checkbox} from "@mui/material";

export default function ChecklistItem(
    {
        item,
        index,
        listOfItems,
        setListOfItems,
        setFlag,
        deliveryUrl,
        createItemUrl
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
        </div>
    )
}