import './CreateTableButton.css'
import { useNavigate } from 'react-router';

export default function CreateTableButton({ setTables, onCLickFunction }) {
    const navigate = useNavigate();
    
    return (
        <button 
            className="create-table-button"
            onClick={() => {
                        fetch('/api/tables', {
                          method: 'POST',
                        })
                          .then(response => response.json())
                          .then(data => {
                            setTables(prevTables => [...prevTables, data]);
                            navigate(`/${data.id}`)
                          })
                      }}
        >
            <h1>
                Crează masă
            </h1>
        </button>
    )
}