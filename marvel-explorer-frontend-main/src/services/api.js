import axios from 'axios';
import { BASE_URL } from '../const'

const apiMarvel = () =>
    axios.create({
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

export default apiMarvel;