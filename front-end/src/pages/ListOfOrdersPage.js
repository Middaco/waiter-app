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

export default function ListOfOrdersPage() {     
    const { auth } = useAuth()

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
    
    if(!accessToken){
      return (
        <LinearProgress/>
      )
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
            sx={{alignSelf:'flex-start'}}
            className="arrow-back"
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
        <SectionTitle title="Mese active" />
        <div className="list-of-tables">
          {orders.map(currentOrder => {
            return <OrderCard 
              key={currentOrder._id}
              order={currentOrder}
              accessToken={accessToken}
            />})}
        </div>
        <SectionTitle title="Mese inactive" />
      </div>
    
  );
}