import { redirect } from "react-router-dom";

export function routerMiddleware(){
    const token = localStorage.getItem("accessToken")
    if(!token){
        redirect('/')
    }
}