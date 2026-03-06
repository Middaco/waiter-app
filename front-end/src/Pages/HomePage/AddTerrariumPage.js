import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react"
import { addTerrarium } from "../../Utils/AddTerrarium";
import { useNavigate } from "react-router-dom";

export default function AddTerrariumForm(){
    const [terrariumName, setTerrariumName] = useState('')
    const [terrariumDescription, setTerrariumDescription] = useState('')
    const [terrariumPrice, setTerrariumPrice] = useState(0)
    const navigate = useNavigate()

    return(
        <Box
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
        height="100vh"
        >
        <form 
            onSubmit={(event) => {
                event.preventDefault()
                addTerrarium(
                    terrariumName,
                    terrariumDescription,
                    terrariumPrice
                )
                navigate("/home")
            }}
            style={{
                display:"flex",
                flexDirection:"column"
            }}    
        >
            <TextField 
                id="terrarium-name" 
                label="Terrarium Name" 
                variant="outlined"
                value={terrariumName}
                onChange={(event) => {
                    setTerrariumName(event.target.value)
                }}
                sx={{marginBottom: '20px'}}
            />
            <TextField 
                id="terrarium-description" 
                label="Description" 
                variant="outlined"
                value={terrariumDescription}
                onChange={(event) => {
                    setTerrariumDescription(event.target.value)
                }}    
                sx={{marginBottom: '20px'}}
            />
            <TextField 
                id="terrarium-price" 
                label="Price" 
                variant="outlined"
                value={terrariumPrice}
                onChange={(event) => {
                    setTerrariumPrice(event.target.value)
                }}    
                sx={{marginBottom: '20px'}}
            />
            <Button 
                type="submit" 
                fullWidth
                variant="contained"    
            >
                Save Terrarium
            </Button>
        </form>
        </Box>
    );
}