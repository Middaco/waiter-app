import axios from "axios";

export const Logout = async () => {
    const token = localStorage.getItem("accessToken")

    if(!token){
        console.log("No Token!")
        return false;
    }

    try{
        const response = await axios
        .post(
            '//localhost:4000/user/logout', {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        if (response.status === 200) {
            localStorage.removeItem('accessToken');
            return true;

          } else {
            console.error('Failed to log out');
            return false;
          }
    }catch(error){
        console.log("Error during logout:" + error.message)
        return false;
    }
    

    
        
}