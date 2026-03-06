import axios from "axios"

export function addTerrarium(
    nameOfTerrarium,
    descriptionOfTerrarium,
    priceOfTerrarium
){
    axios
            .post(
                '//localhost:4000/terrariums',
                {
                    name: nameOfTerrarium,
                    details: descriptionOfTerrarium,
                    price: priceOfTerrarium,
                    showDetails: false
                },
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            )
}