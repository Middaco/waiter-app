import { Outlet, useLocation, Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({
    requiredRole
}) => {
    const { auth } = useAuth()
    const location = useLocation()

    const user = jwtDecode(JSON.parse(auth).accessToken)

    return(
        requiredRole.find(role => role === user.role)
        ? <Outlet/>
        : <Navigate to= '/listOfTables' state = {{from: location}} replace/>
    )
}

export default RequireAuth;