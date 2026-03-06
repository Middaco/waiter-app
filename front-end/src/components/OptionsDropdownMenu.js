import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ClickAwayListener, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function OptionsDropdownMenu(props){
    const [open, setOpen] = useState(false)
    const anchorRef = useRef(null)
    const navigate = useNavigate()

    const handleToggle = () => {
        setOpen(prevValue => !prevValue)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDeleteRequest = () => {
        axios.delete(`http://localhost:8080/orders/${props.orderId}`,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${props.accessToken}`
                }
            }
        )
            .then(navigate(-1))
            .catch(err => console.log(err))

    }
    
    return (
        <div>
            <IconButton
                children={<MoreVertIcon/>}
                onClick={handleToggle}
                ref={anchorRef}
            />
            <Popper
                open={open}
                placement='bottom-end'
                anchorEl={anchorRef.current}
            >
                <ClickAwayListener onClickAway={handleClose}>
                    <Paper>
                        <MenuList>
                            <MenuItem onClick={() => {
                                handleClose() 
                                handleDeleteRequest()
                            }}>
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </div>
    )
}