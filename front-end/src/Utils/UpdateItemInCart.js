import axios from "axios";

export default function updateItemInCart({
    itemID,
    itemTotalPrice,
    itemOldQuantity,
    itemNewQuantity
}){
    return axios
        .put(
            '//localhost:4000/cart/update',
            {
                newQuantity:itemNewQuantity,
                terrariumID:itemID,
                totalPrice:itemTotalPrice,
                oldQuantity:itemOldQuantity
            },
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
}