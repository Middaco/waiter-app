import axios from "axios";

export default function removeItemFromCart(
    terrariumID
){
    return axios
        .delete(
            `//localhost:4000/cart/removeFromCart/${terrariumID}`,
            {
                headers:{
                    Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
                }
            }
        )
}