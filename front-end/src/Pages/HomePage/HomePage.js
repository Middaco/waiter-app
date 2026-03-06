import React from "react"
import {Box, AppBar, Toolbar, Button} from "@mui/material"
import { Outlet, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Logout} from '../../Utils/LogOut'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { jwtDecode } from "jwt-decode";

function HomePage() {
    return (
      <>
        <TerrariumsAppBar/>
        <Outlet/>
      </>
    );
  }
  
export default HomePage;

function TerrariumsAppBar(){
  const navigate = useNavigate()
  const token = localStorage.getItem("accessToken")
  const user = jwtDecode(token)
  const isAdmin = user.isAdmin

  return(
    <Box 
      sx={{flexGrow: 1}}
    >
      <AppBar 
        position="static"
        sx={{
          height:"8vh"
        }}
      >
        <Toolbar>
        <Button
            onClick={
              () => {
                navigate("/home")
              }
            }
            color="inherit"
            sx={{
              flexGrow: 1,
              marginRight: '20px'
            }}
          >
            List of Terrariums
          </Button>
          {(isAdmin ?
            <Button
            onClick={
              () => {
                navigate("/addTerrarium")
              }
            }
            color="inherit"
            sx={{
              flexGrow: 1,
              marginRight: '20px'
            }}
          >
            Add Terrarium
          </Button>
            :
            <></>
          )}
          {(isAdmin?
            <></>
            :
            <AccountCircleIcon
            onClick={
              () => {
                navigate("/home/profile")
              }
            }
            sx={{
              cursor:'pointer',
              marginRight:'20px',
              marginLeft:'20px'
            }}
          />
          )}
          
          {(isAdmin?
            <></>
            :
            <ShoppingCartIcon
            onClick={
              () => {
                navigate("/home/cart")
              }
            }
            sx={{
              cursor:'pointer',
              marginRight:'20px',
              marginLeft:'20px'
            }}
          />
          )}
          <Button
            color="inherit"
            onClick={
              () => {
                if(Logout()){
                  navigate('/')
                }
              }
            }
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

