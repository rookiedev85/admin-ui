import axios from 'axios';

const API_BASE_URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

export const getData = async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    localStorage.setItem('data', JSON.stringify(response.data));
    return response.data;
};
