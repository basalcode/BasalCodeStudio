import axios from 'axios';

export const get = async formData => await axios({
    method: 'get',
    url: `/api/auth?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`,
}).then(response => response.data);