import axios from 'axios';


const BASE_URL = 'https://youtube-v31.p.rapidapi.com';


const options = {
   
    headers:{
        'Content-Type':'application/json',
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY, // Ensure this is correctly set in your .env file
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
          
    },
};
console.log('API key:',process.env.REACT_APP_RAPIDAPI_KEY);

export const fetchFromAPI = async (url)=>{
    try{
        const {data}=await axios.get(`${BASE_URL}/${url}`,options); 
        return data;
        
    }catch(error){
        console.error('Error fetching data from API',error.response ? error.response.data:error.message);
        throw error;
    }
}