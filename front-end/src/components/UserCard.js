import useAuth from '../hooks/useAuth';
import './UserCard.css'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { Divider, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function UserCard({
    user
}){
    const { auth } = useAuth()
    const { accessToken } = JSON.parse(auth)

    const userRole = useRef(user.role)
    const userName = useRef(user.name)
    const userAccessCode = useRef(user.id)

    const [accessCodeFieldType, setAccessCodeFieldType] = useState('password')

    const handleRoleChange = (newUserRole) => {
        userRole.current = newUserRole
    }

    const handleNameChange = (newUserName) => {
        userName.current = newUserName
    }

    const handleAccessCodeChange = (newAccessCode) => {
        userAccessCode.current = newAccessCode
    }

    const handleVisibilityChange = () => {
        setAccessCodeFieldType(oldValue => {
            if(oldValue === 'password'){
                return 'text'
            }
            return 'password'
        })
    }

    const handleUserDelete = async () => {
        await axios.delete(`http://localhost:8080/user/${user._id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .catch(err => console.log(err))
    }

    const handleUserUpdate = async () => {
        await axios.patch(`http://localhost:8080/user/${user._id}`, {
            name: userName.current,
            role: userRole.current,
            id: userAccessCode.current
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => console.log('Updated ' + JSON.stringify(res.data)))
            .catch(err => console.log(err))
    }

    

    return (
        <div className='user-card-wrapper'>
            <div className='waiter-info'>
                <label 
                    className="input-field-label"
                    for="user-name"
                >
                    Nume utilizator:
                </label>
                <input 
                    name='user-name'
                    style={{
                        marginBlockEnd:'0.2rem',
                        fontSize: '2rem',
                        border: 'none'
                    }}
                    defaultValue={user.name}
                    onChange={event => handleNameChange(event.target.value)}
                />
                <Divider flexItem/>
                {/* access code field */}
                <label 
                    className="input-field-label"
                    for="access-code"
                >
                    Cod de acces:
                </label>
                <div className='access-code-field-wrapper' name='access-code'>
                    <input
                        style={{
                            marginBlockEnd:'0.2rem',
                            fontSize: '2rem',
                            border: 'none'
                        }}
                        defaultValue={user.id}
                        type={accessCodeFieldType}
                        onChange={event => handleAccessCodeChange(event.target.value)}
                    />
                    {
                        accessCodeFieldType === 'password'
                        ? <VisibilityIcon style={{cursor:'pointer'}} onClick={handleVisibilityChange}/>
                        : <VisibilityOffIcon style={{cursor:'pointer'}} onClick={handleVisibilityChange}/>
                    }
                </div>
                <Divider flexItem/>

                <label 
                    className="input-field-label"
                    for="user-role"
                >
                    Rol:
                </label>
                <Select
                    defaultValue={user.role}
                    name='user-role'
                    onChange={event => handleRoleChange(event.target.value)}
                >
                    <MenuItem value={'waiter'}>Ospătar</MenuItem>
                    <MenuItem value={'shiftLeader'}>Șef de sală</MenuItem>
                    <MenuItem value={'admin'}>Administrator</MenuItem>
                </Select>
            </div>
            <Divider flexItem orientation='vertical' aria-hidden="true" variant='middle'/>
            <div className='icons-wrapper'>
                <SaveIcon 
                    style={{
                        cursor:'pointer',
                        fontSize:'2em'
                    }}
                    onClick={handleUserUpdate}
                />
                <DeleteIcon 
                    style={{
                        cursor:'pointer',
                        fontSize:'2em'
                    }}
                    onClick={handleUserDelete}
                />
            </div>
            
        </div>
    )
}