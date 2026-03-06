import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Input } from '@mui/base/Input';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import removeItemFromCart from '../Utils/RemoveItemFromCart';
import updateItemInCart from '../Utils/UpdateItemInCart';

//TODO: add divider

export default function ListOfCartItems(
    {ListOfCartItems,
    setTriggerCallback}
){
    return(
        <List
            sx={{
                width:'100%'
            }}
        >
            {
                ListOfCartItems.map((cartItem) => (
                    <>
                    <ListItem
                        sx={{
                            display:'flex',
                            flexDirection:'row',
                            alignContent:'flex-start'
                        }}
                    >
                        <img 
                            style={{
                                flex:'1'
                            }}
                            src='../images/terariu1.jpg' 
                            alt={cartItem.name}
                            loading='lazy'
                        />
                        <Typography
                            flex={2}
                        >
                            {cartItem.name}
                        </Typography>
                        <Input
                            defaultValue={cartItem.quantity}
                            type='number'
                        />
                        <Typography
                            flex={1}
                            marginLeft='1vw'
                        >
                            Price: {cartItem.totalPrice}
                        </Typography>
                        <DeleteOutlineIcon
                            onClick={() => {
                                removeItemFromCart(cartItem.terrariumID)
                                setTriggerCallback()
                            }}
                            sx={{
                                cursor: 'pointer'
                            }}
                        />
                    </ListItem>
                    </>
                ))
            }
            
        </List>
    )
}