import { Navigate } from "react-router"

export default function Unauthorized() {
    return (
        <Navigate to='listOfTables' replace/>
    )
}