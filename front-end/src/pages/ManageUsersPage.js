import axios from "axios"
import { useEffect, useRef, useState } from "react"
import useAuth from "../hooks/useAuth"
import { Button, Divider, FormControlLabel, RadioGroup } from "@mui/material"
import "./ManageUsersPage.css"
import UserCard from "../components/UserCard"
import {Radio} from "@mui/material"

export default function ManageUsersPage(){
    const [users, setUsers] = useState([])    

    const userName = useRef('')
    const userAccessCode = useRef('')
    const userRole = useRef('')

    const {auth} = useAuth()
    const { accessToken } = JSON.parse(auth)
    
    useEffect(() => {
        console.log(accessToken)
        axios.get('http://localhost:8080/users', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => setUsers(res.data))
    }, [accessToken])

    if(users.length === 0){
        return <h1>No users available.</h1>
    }

    const handleSubmit = async () => {
        await axios.post('http://localhost:8080/user', {
            id: userAccessCode.current,
            name: userName.current, 
            role: userRole.current
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => setUsers(oldUsers => [...oldUsers, res.data]))
            .catch(err => console.log(err))
    }

    const handleUserNameChange = (userNameInputField) => {
        userName.current = userNameInputField
    }

    const handleUserAccessCodeChange = (userAccessCodeInputField) => {
        userAccessCode.current = userAccessCodeInputField
    }

    const handleRadioSelection = (userRoleRadioButton) => {
        userRole.current = userRoleRadioButton
    }

    return (
        <div className="page-wrapper">
            <div className="form-container">
                <label 
                    className="input-field-label"
                    for="user-name-input-field"
                >
                    Nume utilizator:
                </label>
                <input
                    className="input-field"
                    name="user-name-input-field"
                    type="text"
                    placeholder="Utilizator nou"
                    onChange={(event) => handleUserNameChange(event.target.value)}
                />
                <label 
                    className="input-field-label"
                    for="access-code-input-field"
                >
                    Cod de acces:
                </label>
                <input
                    className="input-field"
                    name="access-code-input-field"
                    type="number"
                    placeholder="1234"
                    onChange={(event) => handleUserAccessCodeChange(event.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Creează utilizator
                </Button>

                <RadioGroup   
                    row
                    onChange={(event) => handleRadioSelection(event.target.value)}
                >
                    <FormControlLabel 
                        value="admin"
                        control={<Radio />}
                        label="Admin"
                    />
                    <FormControlLabel 
                        value="shiftLeader"
                        control={<Radio />}
                        label="Șef de sală"
                    />
                    <FormControlLabel 
                        value="waiter"
                        control={<Radio />}
                        label="Ospătar"
                    />
                </RadioGroup>
            </div>

            <Divider
                variant="middle"
                flexItem
            />
            <div className="users-list-container">
                {
                    users.map(user => <UserCard user={user}/>)
                }
            </div>
            
        </div>
    )
}