import axios from "axios"
export const checkLoggedinUser = async()=>{
    let token = localStorage.getItem("ikea-token")
    if(token){
       return await axios.get('https://azure-rhinoceros-cap.cyclic.app/loggedInUser',{
            headers:{
                'authorization' : `Bearer ${token}`
            }
        })
    }
}