import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, {useState} from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <form
                style={{
                    display:"flex",
                    flexDirection:"column"
                }}
                onSubmit={(event) => {
                    event.preventDefault()
                    axios
                        .post('//localhost:4000/user/register',
                            {
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                username: username,
                                password: password
                            }
                        )
                        .then(navigate('/'))
                }}
            >
                <TextField
                    id="first-name-field"
                    variant="outlined"
                    label="First Name"
                    value={firstName}
                    onChange={(event) => {
                        setFirstName(event.target.value)
                    }}
                    sx={{marginBottom: '20px'}}
                />
                <TextField
                    id="last-name-field"
                    variant="outlined"
                    label="Last Name"
                    value={lastName}
                    onChange={(event) => {
                        setLastName(event.target.value)
                    }}
                    sx={{marginBottom: '20px'}}
                />
                <TextField
                    id="email-field"
                    variant="outlined"
                    label="E-mail"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }}
                    sx={{marginBottom: '20px'}}
                />
                <TextField
                    id="username-field"
                    variant="outlined"
                    label="Username"
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value)
                    }}
                    sx={{marginBottom: '20px'}}
                />
                <TextField
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {showPassword? 
                                <VisibilityIcon 
                                    onClick={() => {
                                        setShowPassword(!showPassword)
                                    }}
                                    sx={{
                                        cursor:"pointer"
                                    }}
                                /> 
                                : 
                                <VisibilityOffIcon 
                                    onClick={() => {
                                        setShowPassword(!showPassword)
                                    }}
                                    sx={{
                                        cursor:"pointer"
                                    }}
                                />}
                            </InputAdornment>
                        )
                    }}
                    id="password-field"
                    variant="outlined"
                    label="Password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                    sx={{
                        marginBottom: '20px'
                    }}
                    type={showPassword? "password" : "text"}
                    
                />
                <Button
                    id="register-button"
                    variant="contained"
                    type="submit"
                >
                    Register
                </Button>
            </form>
        </Box>
    )
}