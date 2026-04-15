import './CreateOrderButton.css'
import { useNavigate } from 'react-router';
import { useOutletContext } from 'react-router';
import axios from 'axios';

export default function CreateOrderButton({
  setAlertOpen, 
  setAlertMessage,
  setAlertSeverity,
  accessToken
}) {
    const navigate = useNavigate();
    const { fetchOrders } = useOutletContext();
    
    return (
        <button 
            className="create-table-button"
            onClick={() => {
              console.log(accessToken)
              axios.post('http://localhost:8080/orders',{} ,{
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${accessToken}`
                }
              })
                .then((response) => {
                  setAlertOpen(true)
                  setAlertMessage("Masă creată cu succes!")
                  setAlertSeverity("success")
                  return response.data
                })
                .then((data) => {
                  navigate(`${data._id}`, {state: {currentOrder: data}})
                })
                .catch(err => {
                  setAlertOpen(true)
                  setAlertMessage("Eroare la crearea mesei!")
                  setAlertSeverity("error")
                  console.log("Table Create Button error: \n" + err)
                })
              }}
        >
            <h1>
                Crează masă
            </h1>
        </button>
    )
}