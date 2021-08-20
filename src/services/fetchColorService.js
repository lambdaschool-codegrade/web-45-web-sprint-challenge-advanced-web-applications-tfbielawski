//
import axiosWithAuth from '../helpers/axiosWithAuth';
//Fetch function
const fetchColorService = () => {
    //Return calls axsiosWithAuth()
    return axiosWithAuth()
        //Get colors from the api
        .get('/api/colors')
        //
        .then((res) => {
            console.log("FETCHING COLORS>>>> ", res.data);
            //Return the data
            return (res.data);
        })
        //Log the errors
        .catch((err) => {console.log(err); })
}

//Export the function
export default fetchColorService;