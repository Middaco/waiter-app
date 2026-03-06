import axios from "axios"

export function fetchTerrariums({
    page,
    setTerrariums,
    setTotalPages
}){
    axios
        .get(
            `//localhost:4000/terrariums/paginated?page=${page}&pageSize=2`,
            {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem("accessToken")}`
                }
            }
            
        )
        .then(data => {
            const {paginatedTerrariums, totalPages} = data.data
            
            setTerrariums(paginatedTerrariums)
            setTotalPages(totalPages)
        })
}