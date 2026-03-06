import ListItemWithIdNameOnClickCallback from "./ListItemWithIdNameOnClickCallback";
import { deleteTerrarium } from "../Utils/DeleteTerrarium";
import { updateTerrarium } from "../Utils/UpdateTerrarium";
import { useState, useEffect } from "react";
import { fetchTerrariums } from "../Utils/FetchPaginated";
import {Alert, Box, Button, TextField} from "@mui/material"
import { jwtDecode } from "jwt-decode";
import addItemToCart from "../Utils/AddItemToCart";
import CheckIcon from '@mui/icons-material/Check';


export default function TerrariumsList(){
    const [isAlertVisible, setAlertVisible] = useState(false)
    const [terrariums, setTerrariums] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showUpdateForm, setShowUpdateForm] = useState(-1)
    const [showDetails, setShowDetails] = useState(-1)
    const [terrariumUpdateName, setTerrariumUpdateName] = useState('')
    const [terrariumUpdateDescription, setTerrariumUpdateDescription] = useState('')
    
    const token = localStorage.getItem("accessToken")
    const user = jwtDecode(token)
    const isAdmin = user.isAdmin

    useEffect(() => {
      const setTotalPagesCallback = (newNumberOfPages) => {
          setTotalPages(newNumberOfPages);
      }
  
      const setTerrariumsCallback = (newListOfTerrariums) => {
          setTerrariums(newListOfTerrariums);
      }
  
      fetchTerrariums(
          {
              page: currentPage,
              setTerrariums: setTerrariumsCallback,
              setTotalPages: setTotalPagesCallback
          }
      )
  }, [currentPage, terrariums])
  
  const handleNextPage = () => {
    if(currentPage < totalPages){
        setCurrentPage(currentPage + 1);
    }
  }
  
  const handlePreviousPage = () => {
    if(currentPage > 1){
        setCurrentPage(currentPage - 1);
    }
  }
  
  function handleUpdateClick(index){
    if(index !== showUpdateForm){
        setShowUpdateForm(index);
    }else{
        setShowUpdateForm(-1);
    }
  }
  
  function getBooleanForShowingDetails(index){
    return showDetails === index
  }
  
  function getBooleanForUpdating(index){
    return showUpdateForm === index
  }
  
  function handleClickOnTerrariumItemList(index){
    if(index !== showDetails){
        setShowDetails(index);
    }else{
        setShowDetails(-1);
    }
  }
  
    return(
      <>
      {isAlertVisible?
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Added in cart!
        </Alert>
        :
        <></>
      }
      
      <ul className='terrariums-list'>
              {console.log(terrariums)}
              {terrariums.map((currentTerrarium) => (
                  <>  
                      <ListItemWithIdNameOnClickCallback
                          itemToList={currentTerrarium}
                          onClickCallback={handleClickOnTerrariumItemList}
                      />
                      <Button
                        onClick={
                          () => {
                            addItemToCart(
                              currentTerrarium._id,
                              currentTerrarium.name,
                              currentTerrarium.price
                            ).then(
                              result => {
                                  if(result.status === 200){
                                    setAlertVisible(true);
                                    setTimeout(() => {
                                      setAlertVisible(false);
                                    }, 3000); // Hide alert after 3 seconds
                                  }
                                  }
                            )
                          }
                        }
                      >
                        Buy
                      </Button>
                      {(isAdmin ?
                        <Button   
                          onClick={
                            () => {
                              deleteTerrarium({idToDelete: currentTerrarium._id})
                            }
                        }>
                            Delete
                        </Button>
                        :
                        <></>
                      )}
                      {(isAdmin ?
                        <Button 
                          onClick={
                            () => handleUpdateClick(currentTerrarium._id)
                        }>
                            Update
                        </Button>
                        :
                        <></>
                      )}
                      
                      {getBooleanForShowingDetails(currentTerrarium._id) && (
                          <p className="detailsOfTerrarium">{currentTerrarium.details}</p>
                      )}
                      {getBooleanForUpdating(currentTerrarium._id) && (
                          <form onSubmit={(event) => {
                              event.preventDefault();
                              updateTerrarium(
                                currentTerrarium._id,
                                terrariumUpdateName,
                                terrariumUpdateDescription
                              );
                          }}>
                              <TextField 
                                variant="outlined" 
                                label="New name"
                                value={terrariumUpdateName}
                                onChange={
                                  (event)=>{
                                    setTerrariumUpdateName(event.target.value)
                                  }
                                }/>
                              <TextField
                                variant="outlined" 
                                label="New description"
                                value={terrariumUpdateDescription}
                                onChange={
                                  (event)=>{
                                    setTerrariumUpdateDescription(event.target.value)
                                  }
                                }/>
                              <Button
                                type="submit"
                              >
                                Update Terrarium
                              </Button>
                          </form>
                      )}
                  </>
                  
              ))}
              <Box
                display='flex'
                flexDirection='row'
                justifyContent='center'
                width='100vw'
              >
              <Button 
                onClick={handlePreviousPage} 
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
              </Box>
          </ul>
          </>
    )
  }