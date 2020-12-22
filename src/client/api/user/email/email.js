import axios from 'axios';

export const get = async email => await axios({
    method: 'GET',
    url: `/api/user/email?email=${encodeURIComponent(email)}`
}).then(response => response.data);