import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import './AutheticationStyle.css';

export default function AuthenticationForm(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    function handleLogIn(username, password){
        console.log(username);
        console.log(password);
        axios
            .post(
                '//localhost:4000/user/login',
                {
                    username: username,
                    password: password
                }
            )
            .then((token) => {
                if(token){
                    localStorage.setItem("accessToken", token.data)
                    navigate("/home")
                }else{
                    navigate("/")
                }
            })
    }
    
    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center"
            height="100vh"
        >
            
            <form style={{
                border:'2px solid grey',
                padding: '30px',
                background: 'gray'
                
            }} onSubmit={(event) => {
            event.preventDefault();
            handleLogIn(username, password);
            }}>
                <h1>Log In</h1>
                <div className="form-item">
                    <TextField 
                        id="username-field" 
                        label="Username" 
                        variant="outlined" 
                        sx={{marginBottom: '20px'}}
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="form-item">
                    <TextField 
                        id="password-field" 
                        label="Password" 
                        type="password" 
                        variant="outlined"
                        sx={{marginBottom: '20px'}} 
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <Button 
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{marginBottom: '20px'}} 
                >
                    Log In
                </Button>
                <Typography variant="caption">
                    Don't have an account? <Link to='/register'>Register here</Link>
                </Typography>
            </form>
            
        </Box>
    )
}