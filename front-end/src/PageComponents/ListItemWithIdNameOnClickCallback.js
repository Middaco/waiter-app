import React from "react";

export default function ListItemWithIdNameOnClickCallback ({
    itemToList,
    onClickCallback
}) {
    return (
        <li key={itemToList._id}
            onClick={
                () => onClickCallback(itemToList._id)
        }>
            {itemToList.name}            
        </li>
    );
}