//
import axios from 'axios';
//Axios with auth function
const axiosWithAuth = ()=> {
    //get the token and assign to "token"
    const token = localStorage.getItem("token");
    //Return function calls axios.create()
    return axios.create({
        headers: {authorization: token },
        baseURL: "http://localhost:5000/"
    });
}

export default axiosWithAuth;
//Task List:
//Build and export a function used to send in our authorization token