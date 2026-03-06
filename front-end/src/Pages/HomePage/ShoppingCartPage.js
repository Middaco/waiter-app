import { Box, Button } from "@mui/material";
import ListOfCartItems from "../../PageComponents/ListOfCartItems";
import getListOfCartItems from "../../Utils/GetListOfCartItems";
import { useEffect, useState } from "react";
import ListOfPrices from "../../PageComponents/ListOfPrices";


export default function ShoppingCartPage(){
    const [cartItems, setListOfCartItems] = useState([])
    const [trigger, setTrigger] = useState(0)

    useEffect(() => {
        const setListOfCartItemsCallback = (newListOfCartItems) => {
            setListOfCartItems(newListOfCartItems)
        }

        getListOfCartItems(setListOfCartItemsCallback)
    },[trigger])

    function handleDeleteOfCartItem(){
        setTrigger(prev => prev + 1)
    }

    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            height='92vh'
        >
            {/*container of the cart*/}
            <Box
                display='flex'
                flexDirection='row'
                height='80vh'
                width='80vw'
                sx={{
                    background:'grey'
                }}
            >
                {/*List of cart items */}
                <Box
                    width='52vw'
                    paddingY='3vh'
                    paddingX='3vw'
                    display='flex'
                    flexDirection='column'
                    alignContent='flex-start'
                    justifyContent='flex-start'
                >
                    <ListOfCartItems
                        ListOfCartItems = {cartItems}
                        setTriggerCallback = {handleDeleteOfCartItem}
                    />
                </Box>
                {/*Container for List of prices + checkout button */}
                <Box
                    width='25vw'
                    display='flex'
                    flexDirection='column'
                    justifyContent='flex-start'
                    alignItems='center'
                >
                    {/**List of prices */}
                    <Box
                        width='20vw'
                        paddingY='3vh'
                        paddingX='2vw'
                        display='flex'
                        flexDirection='column'
                        alignContent='flex-start'
                        justifyContent='flex-start'
                        flex={2}
                    >
                        <ListOfPrices
                            ListOfCartItems = {cartItems}
                        />
                    </Box>
                    {/**Button for checkout */}
                    <Button
                        variant="contained"
                        sx={{
                            marginY:'3vh'
                        }}
                    >
                        Checkout
                    </Button>
                
                </Box>
                
            </Box>
        </Box>
    )
}