import axios from "axios"

export function updateTerrarium(
    idToUpdate,
    terrariumUpdateName,
    terrariumUpdateDescription
){
    axios
            .put(
                `//localhost:4000/terrariums/${idToUpdate}`,
                {
                    name: terrariumUpdateName,
                    details: terrariumUpdateDescription,
                    showDetails: false     
                },
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            )
}