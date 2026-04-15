import { Alert, Button, Snackbar, TextField } from "@mui/material";
import "./LogInPage.css"
import waiter_logo from '../images/waiter-image.png'
import logo from '../images/Logo.png'
import { useState, useRef } from "react";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { replace } from "lodash";


export default function LogInPage(){
    
    const navigate = useNavigate()

    const { setAuth } = useAuth()
    const [userCode, setUserCode] = useState('')
    const [alertText, setAlertText] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("")

    let isAlertHidden = useRef(true)


    function handleSubmit(){
        if(userCode){
            axios.post('http://localhost:8080/login', {
                userCode: userCode,
            })
                .then(response => {
                    if(response.status === 200){
                        setAlertText("Success!")
                        setAlertSeverity("success")
                        isAlertHidden = !isAlertHidden
                        setAuth(JSON.stringify({
                            accessToken: response.data.accessToken
                        }))
                        navigate({pathname: "/home"}, {state: response.data.accessToken})
                        // console.log(response.data.accessToken)
                    }
                })
                .catch(response => {
                    if(response.status === 404){
                        setAlertText(response.data)
                        setAlertSeverity("error")
                        isAlertHidden = !isAlertHidden
                    }else if(response.status === 500){
                        setAlertText(response.data)
                        setAlertSeverity("warning")
                        isAlertHidden = !isAlertHidden
                    }
                })
        }else{
            isAlertHidden = !isAlertHidden
        }
    }

    return (
        <div className="page-wrapper">
            <Snackbar
                open={!isAlertHidden}
                autoHideDuration={2000}
                onClose={() => isAlertHidden = !isAlertHidden}  
            >
                <Alert 
                    severity={alertSeverity}
                    icon={<PriorityHighIcon />} 
                >
                    {alertText}
                </Alert>
            </Snackbar>
            
            <div className="logo-wrapper">
                <img src={logo} alt=""/>
            </div>
            <div className="log-in-wrapper">
                <div className="user-code-and-icon-group">
                    <img className="waiter-icon" src={waiter_logo} alt="Logo"/>
                    <TextField 
                        value={userCode}
                        onChange={(event) => {setUserCode(event.target.value)}} 
                        onKeyDown={(key) => {
                            if(key.key === "Enter"){
                                handleSubmit()
                            }
                        }}
                        className="user-code" 
                        label="User Code" 
                        helperText="ex: 123"
                    />                
                </div>
                <Button 
                    className="log-in-button" 
                    variant="contained" 
                    onClick={() => handleSubmit()}
                >
                    Log In
                </Button>
            </div>
        </div>
        
    )
}