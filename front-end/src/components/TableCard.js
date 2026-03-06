import './TableCard.css'
import { useRef } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

export default function TableCard({
    table
}){
    const editable = useRef(false)

    const { auth } = useAuth()
    const accessToken = JSON.parse(auth).accessToken

    const handleDelete = async () => {
        await axios.delete(`http://localhost:8080/tables/${table._id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res=>console.log(res.data))
    }

    const handleUpdateTrigger = () => {
        editable.current = true
    }

    const handleUpdate = async(newTableName) => {
        await axios.patch(`http://localhost:8080/tables/${table._id}`, {
            name: newTableName
        }, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => console.log(res.data))
    }

    return (
        <div className='card-wrapper'>
            <input
                contentEditable={editable}
                defaultValue={table.name}
                onKeyDown={(event) => {
                    if(event.key === 'Enter'){
                        handleUpdate(event.target.value)
                    }
                    editable.current = false
                }}
            />
            <div className='icon-wraooer'>
                <EditIcon
                    style={{
                        cursor:"pointer",
                        marginRight:"1.5rem"
                    }}
                    onClick={handleUpdateTrigger}
                />
                <DeleteIcon
                    style={{
                        cursor:"pointer"
                    }}
                    onClick={handleDelete}
                />
            </div>

        </div>
    )
}