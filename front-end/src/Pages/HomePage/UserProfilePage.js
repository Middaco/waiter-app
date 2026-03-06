import { Avatar, Box, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";

export default function UserProfilePage(){
    const user = jwtDecode(localStorage.getItem("accessToken"))

    return(
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            height='92vh'
        >
            <Box
                display='flex'
                flexDirection='column'
                height='80vh'
                width='60vw'
                alignItems='center'
                sx={{
                    background:'red'
                }}
            >
                <Avatar 
                    sx={{ 
                        background: 'orange',
                        height: '10em',
                        width: '10em',
                        marginTop: '20px',
                        marginBottom: '20px'
                    }}
                >
                    {user.username[0]}
                </Avatar>
                <Box
                    flexGrow={2}
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='flex-start'
                >
                    <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='baseline'
                    >
                        <Typography
                            variant="h6"
                            marginRight='1em'
                        >
                            Username: 
                        </Typography>
                        <Typography>{user.username}</Typography>
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='baseline'
                    >
                        <Typography
                            variant="h6"
                            marginRight='1em'
                        >
                            First name: 
                        </Typography>
                        <Typography>{user.firstName}</Typography>
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='baseline'
                    >
                        <Typography
                            variant="h6"
                            marginRight='1em'
                        >
                            Last name: 
                        </Typography>
                        <Typography>{user.lastName}</Typography>
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='baseline'
                    >
                        <Typography
                            variant="h6"
                            marginRight='1em'
                        >
                            E-mail: 
                        </Typography>
                        <Typography>{user.email}</Typography>
                        </Box>
                </Box>
                
            </Box>
        </Box>
    )
}