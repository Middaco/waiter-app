import './App.css';
import ListOfOrdersPage from './pages/ListOfOrdersPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import OrderInfoPage from './pages/OrderInfoPage';
import LogInPage from './pages/LogInPage';
import { Outlet } from 'react-router';
import { useState, useCallback } from 'react';
import axios from 'axios';
import HomePage from './pages/HomePage';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import AssignTablesPage from './pages/AssignTablesPage';
import ManageTablesPage from './pages/ManageTablesPage';
import ManageUsersPage from './pages/ManageUsersPage';
import TablesStatisticsPage from './pages/TablesStatisticsPage'

function App() {
  const [orders, setOrders] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState('error')

  const ROLES = {
    'waiter': 'waiter',
    'shiftLeader': 'shiftLeader',
    'admin': 'admin'
  }

  const fetchOrders = useCallback((accessToken) => {
    axios.get('http://localhost:8080/orders', {
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    })
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
    // eslint-disable-next-line 
    }, [])

  const stopTimer = useCallback((tableId) => {
    axios.patch(`http://localhost:8080/orders/${tableId}/stopTimer` )
      .then(response => {
        setOrders(response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error stopping timer:', error);
      });
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='unauthorized' element={<Unauthorized/>}/>
        <Route index element={<LogInPage/>}/>
        
        <Route element = {<RequireAuth
          requiredRole = {[ROLES.shiftLeader, ROLES.admin]}
        />}>
          <Route
            path='home'
            element={<HomePage/>}
          />
          <Route 
            path='assignTables'
            element={<AssignTablesPage/>}
          />
          <Route
            path='statistics'
            element={<TablesStatisticsPage/>}
          />
        </Route>

        <Route element = { <RequireAuth
          requiredRole={[ROLES.admin]}
        />}>
          <Route
            path='manageTables'
            element={<ManageTablesPage/>}
          />
          <Route
            path='manageUsers'
            element={<ManageUsersPage/>}
          />
        </Route>
        
        <Route element = {<RequireAuth
          requiredRole = {[ROLES.shiftLeader, ROLES.admin, ROLES.waiter]}
        />}>
          <Route 
            path='listOfOrders' 
            element={
            <Outlet 
              context={{
                orders, 
                fetchOrders, 
                alertOpen, 
                setAlertOpen, 
                alertMessage, 
                setAlertMessage, 
                alertSeverity, 
                setAlertSeverity, 
                stopTimer
              }} 
            />}
          >
            <Route index element={<ListOfOrdersPage />} />
            <Route path=":id" element={<OrderInfoPage />} />
          </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
