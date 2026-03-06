import axios from "axios"

export function deleteTerrarium({
    idToDelete
}){
    return(
    axios
            .delete(
                `//localhost:4000/terrariums/${idToDelete}`,
                {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            )
        )
}