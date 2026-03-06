import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ListItemWithIdNameOnClickCallback from "./ListItemWithIdNameOnClickCallback";
import { fetchTerrariums } from "../Utils/FetchPaginated";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const TerrariumsList = ({ 
    terrariumsList, 
    handleClickOnTerrariumItemList,
    handleDeleteRequest,
    handleUpdateClick,
    getBooleanForShowingDetails,
    getBooleanForUpdating,
    handleTerrariumUpdate,
    terrariumUpdateName,
    handleUpdateNameChange,
    terrariumUpdateDescription,
    handleUpdateDescriptionChange
  }) => {
    return (
        <ul className='terrariums-list'>
            {/*Loops through every terrarium and creates an item list */}
            {terrariumsList.map((currentTerrarium) => (
                <>  
                    <ListItemWithIdNameOnClickCallback
                        itemToList={currentTerrarium}
                        onClickCallback={handleClickOnTerrariumItemList}
                    />
                    <button onClick={() => handleDeleteRequest(currentTerrarium._id)}>
                        Delete
                    </button>
                    <button onClick={() => handleUpdateClick(currentTerrarium._id)}>
                        Update
                    </button>
                    
                    {getBooleanForShowingDetails(currentTerrarium._id) && (
                        <p className="detailsOfTerrarium">{currentTerrarium._details}</p>
                    )}
                    {getBooleanForUpdating(currentTerrarium._id) && (
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            handleTerrariumUpdate(currentTerrarium._id);
                        }}>
                            <label>New name of terrarium:</label>
                            <input type="text" value={terrariumUpdateName.value} onChange={handleUpdateNameChange}/>
                            <label>New description of terrarium:</label>
                            <input type="text" value={terrariumUpdateDescription.value} onChange={handleUpdateDescriptionChange}/>
                            <input type="submit" value="Update Terrarium"/>
                        </form>
                    )}
                </>
                
            ))}
        </ul>
    )
}

export default function MainContent(){
    const [terrariums, setTerrariums] = useState([])
    const [showDetails, setShowDetails] = useState(-1)
    const [showUpdateForm, setShowUpdateForm] = useState(-1)
    const [terrariumName, setTerrariumName] = useState('')
    const [terrariumDescription, setTerrariumDescription] = useState('')
    const [terrariumUpdateName, setTerrariumUpdateName] = useState('')
    const [terrariumUpdateDescription, setTerrariumUpdateDescription] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

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

    function handleTerrariumSaving(event){
        event.preventDefault();

        axios
            .post(
                '//localhost:4000/terrariums',
                {
                    name: terrariumName,
                    details: terrariumDescription,
                    showDetails: false
                }
            )
            .then(() => fetchTerrariums(currentPage))
    }

    function handleDeleteRequest(idToDelete){
        axios
            .delete(
                `//localhost:4000/terrariums/${idToDelete}`,
                {
                    headers: {
                        'authorization': `Bearer ${document.cookie.split('=')[1]}`
                    }
                }
            )
            .then(() => fetchTerrariums(currentPage))
    }

    const handleTerrariumUpdate = (idToUpdate) => {
        axios
            .put(
                `//localhost:4000/terrariums/${idToUpdate}`,
                {
                    name: terrariumUpdateName,
                    details: terrariumUpdateDescription,
                    showDetails: false     
                }
            )
            .then(() => fetchTerrariums(currentPage))
    }

    
    

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

    }, [currentPage])

    function handleClickOnTerrariumItemList(index){
        if(index !== showDetails){
            setShowDetails(index);
        }else{
            setShowDetails(-1);
        }
    }

    function getBooleanForShowingDetails(index){
        return showDetails === index
    }

    function handleNameChange(event){
        setTerrariumName(event.target.value);
    }

    function handleDescriptionChange(event){
        setTerrariumDescription(event.target.value);
    }

    

    
    function getBooleanForUpdating(index){
        return showUpdateForm === index
    }

    function handleUpdateClick(index){
        if(index !== showUpdateForm){
            setShowUpdateForm(index);
        }else{
            setShowUpdateForm(-1);
        }
    }



    function handleUpdateNameChange(event){
        setTerrariumUpdateName(event.target.value);
    }

    function handleUpdateDescriptionChange(event){
        setTerrariumUpdateDescription(event.target.value);
    }

    function handleAscendingSort(){
        const sortedArray = [...terrariums].sort((a, b) => {
            var nameA = a.name.toUpperCase(); 
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
        
            return 0;
        });
        setTerrariums(sortedArray)
    }

    function handleDescendingSort(){
        const sortedArray = [...terrariums].sort((a, b) => {
            var nameA = a.name.toUpperCase(); 
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return 1;
            }
            if (nameA > nameB) {
                return -1;
            }
        
            return 0;
        });
        setTerrariums(sortedArray)
    }

    return (
        <Box>
        <button onClick={() => handleAscendingSort()}> Ascending Sort </button>
        <button onClick={() => handleDescendingSort()}> Descending Sort </button>
        <TerrariumsList
            terrariumsList = {terrariums}
            handleClickOnTerrariumItemList = {handleClickOnTerrariumItemList}
            handleDeleteRequest = {handleDeleteRequest}
            handleUpdateClick = {handleUpdateClick}
            getBooleanForShowingDetails = {getBooleanForShowingDetails}
            getBooleanForUpdating = {getBooleanForUpdating}
            handleTerrariumUpdate = {handleTerrariumUpdate}
            terrariumUpdateName = {terrariumUpdateName}
            handleUpdateNameChange = {handleUpdateNameChange}
            terrariumUpdateDescription = {terrariumUpdateDescription}
            handleUpdateDescriptionChange = {handleUpdateDescriptionChange}
        />
        {/**Pagination control */}
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
        </button>
        </Box>

      )

      
}






