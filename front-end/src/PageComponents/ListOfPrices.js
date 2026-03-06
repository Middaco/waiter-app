import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ListOfPrices(
    {ListOfCartItems}
){
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(()=>{
        let currentPrice = 0
        ListOfCartItems.forEach((cartItem) =>
            currentPrice += cartItem.totalPrice
        );
        setTotalPrice(currentPrice)
    },[ListOfCartItems])

    return(
        <Box
            width='100%'
            display='flex'
            alignContent='space-between'            
        >
            <Typography>
                Total:
            </Typography>
            <Typography>
                {totalPrice}
            </Typography>
        </Box>
        
    )   
}