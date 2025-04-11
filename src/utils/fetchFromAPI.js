import axios from 'axios';
import { REACT_APP_RAPID_API_KEY } from './config';



export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';


const options = {

    params:{
        maxResults:'50' 
       },
    headers:{
        'Content-Type':'application/json',
            'X-RapidAPI-Key': REACT_APP_RAPID_API_KEY, // Ensure this is correctly set in your .env file
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
          
    },
};
console.log('API key:',REACT_APP_RAPID_API_KEY);

export const fetchFromAPI = async (url)=>{
    try{
        const {data}=await axios.get(`${BASE_URL}/${url}`,options); 
        return data;
        
    }catch(error){
        console.error('Error fetching data from API',error.response ? error.response.data:error.message);
        throw error;
    }
}