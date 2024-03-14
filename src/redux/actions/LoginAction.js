// import { BASE_URL } from "../../constant/Index"
import { Login } from "../constants/Index"
import axios from "axios"
export const LoginAction = (payload)=> async (dispatch)=>{
    dispatch({
        type:Login.LOADING,
        payload:{loading:true},
    });
    try {
        const  response  = await axios.post(`https://6da5-2405-201-e059-b805-e5d0-6c8c-c766-33be.ngrok-free.app/api/v1/login`, payload);
        console.log(response,"gjng");
         localStorage.setItem("TOKEN", response && response.data.token);
        await dispatch({
            type: Login.SUCCESS,
            payload: { loading: false, data: response },
        });
        // window.location.href = "/Home/dashboard";
    } catch (err) {
        await dispatch({
            type: Login.ERROR,
            payload: { loading: false, data: {} },
        });
    }
}