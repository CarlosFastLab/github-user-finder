import axios from 'axios';

const apiMap = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode'
})

export default apiMap;