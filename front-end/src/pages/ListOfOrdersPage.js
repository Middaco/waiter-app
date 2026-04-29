import OrderCard from "../components/OrderCard";
import SectionTitle from "../components/SectionTitle";
import CreateOrderButton from "../components/CreateOrderButton";
import "./ListOfOrdersPage.css";
import { useNavigate, useOutletContext } from "react-router";
import CustomAlert from "../components/Alert";
import {jwtDecode} from "jwt-decode"
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import useAuth from "../hooks/useAuth";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {FormControl, InputLabel, Select, MenuItem} from "@mui/material";
export default function ListOfOrdersPage() {     
    const { auth } = useAuth()
    const [sortValue, setSortValue] = useState('')

    const navigate = useNavigate()
    const accessToken = JSON.parse(auth).accessToken
    const [waiter, setWaiter] = useState()
    const {fetchOrders} = useOutletContext();

    useEffect(() => {
      if(accessToken){
        fetchOrders(accessToken)
        setWaiter(jwtDecode(accessToken))
      }
    }, [accessToken])

    const {orders} = useOutletContext();
    const {alertOpen, setAlertOpen, alertMessage, setAlertMessage, alertSeverity, setAlertSeverity} = useOutletContext()
    
    if(orders){
      if(sortValue){

        switch(sortValue){
          case 'bar_asc':
            orders.sort((first, second) => first.barItems.filter(item => !item.isDelivered).length - second.barItems.filter(item => !item.isDelivered).length)
            break
          case 'bar_desc':
            orders.sort((first, second) => -(first.barItems.filter(item => !item.isDelivered).length - second.barItems.filter(item => !item.isDelivered).length))
            break
          case 'kit_asc':
            orders.sort((first, second) => first.kitchenItems.filter(item => !item.isDelivered).length - second.kitchenItems.filter(item => !item.isDelivered).length)
            break
          case 'kit_desc':
            orders.sort((first, second) => -(first.kitchenItems.filter(item => !item.isDelivered).length - second.kitchenItems.filter(item => !item.isDelivered).length))
            break
          case 'time_asc':
            orders.sort((first, second) => -(Date.parse(first.orderTakenAt) - Date.parse(second.orderTakenAt)))
            break
          case 'time_desc':
            orders.sort((first, second) => Date.parse(first.orderTakenAt) - Date.parse(second.orderTakenAt))
            break
          default:
            break
          }
      }
    }

    if(!accessToken){
      return (
        <LinearProgress/>
      )
    }

    const handleSortChange = (newSortValue) => {
      setSortValue(newSortValue)
    }
    
    return (
      <div className="home-page-container">
        <CustomAlert
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          alertMessage={alertMessage}
          alertSeverity={alertSeverity}
        />
        <header className="options">
          <ArrowBackIcon
            // className="arrow-back"
            onClick={() => navigate(-1)}
          />
          <p id="user-greeting">
            Hello, {waiter?.name}!🙋🏼‍♂️
          </p>
        </header>
        <CreateOrderButton
          setAlertOpen={setAlertOpen} 
          setAlertMessage={setAlertMessage}
          setAlertSeverity={setAlertSeverity}
          accessToken={accessToken}
        />
        <FormControl sx={{width:"90%"}}>
          <InputLabel id="simple-select-label">Sort by</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={sortValue}
            label="sortBy"
            onChange={event => handleSortChange(event.target.value)}
          >
            <MenuItem value={"bar_asc"}>Bar Items ⬆️</MenuItem>
            <MenuItem value={"bar_desc"}>Bar Items ⬇️</MenuItem>
            <MenuItem value={"kit_asc"}>Kitchen Items ⬆️</MenuItem>
            <MenuItem value={"kit_desc"}>Kitchen Items ⬇️</MenuItem>
            <MenuItem value={"time_asc"}>Time Elapsed ⬆️</MenuItem>
            <MenuItem value={"time_desc"}>Time Elapsed ⬇️</MenuItem>
          </Select>
        </FormControl>
        <SectionTitle title="Mese active" />
        <div className="list-of-tables">
          {orders.map(currentOrder => {
            if(currentOrder.isActive){
              return <OrderCard 
                key={currentOrder._id}
                order={currentOrder}
                accessToken={accessToken}
              />
            }else{
              return <></>
            }
            })
          }
        </div>
        <SectionTitle title="Mese inactive" />
        <div className="list-of-tables">
          {orders.map(currentOrder => {
            if(!currentOrder.isActive){
              return <OrderCard 
                key={currentOrder._id}
                order={currentOrder}
                accessToken={accessToken}
              />
            }else{
              return <></>
            }
            })
          }
        </div>
      </div>
    
  );
}