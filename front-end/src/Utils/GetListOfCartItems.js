import axios from "axios"

export default function getListOfCartItems( 
    setListOfCartItemsCallback
){
    return axios
        .get(
            '//localhost:4000/cart',
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
        .then(
            (result) => {
                if(result.status === 200){
                    setListOfCartItemsCallback(result.data)
                }else if(result.status === 300){
                    setListOfCartItemsCallback([])
                }
            }
        )
    
}