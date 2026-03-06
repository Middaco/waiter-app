import axios from "axios";

export default function addItemToCart(
    itemID,
    itemName,
    itemPrice
){
    return axios
        .post(
            '//localhost:4000/cart/addInCart',
            {
                terrariumID: itemID,
                terrariumName: itemName,
                terrariumPrice: itemPrice
            },
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
}